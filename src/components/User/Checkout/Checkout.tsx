"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import CheckoutForm from "./CheckoutForm";
import OrderDetail from "./OrderDetail";
import { Form } from "antd";
import { createVNPayPayment } from "@/services/VNPayService";
import { CART_KEY, checkShoppingCartData, deleteAllCartItems, ICartItem, removeAllCartItems, useShoppingCart } from "@/services/user/ShoppingCartService";
import BreadcrumbSection from "@/components/Breadcrumb/BreadCrumb";
import { ORDER_CHANEL } from "@/constants/OrderChanel";
import { ORDER_TYPE } from "@/constants/OrderType";
import { ORDER_STATUS } from "@/constants/OrderStatus";
import { PAYMENT_METHOD } from "@/constants/PaymentMethod";
import { IOrderOnlineCreateOrUpdate } from "@/types/IOrder";
import { ICreateOrUpdateOrderItem } from "@/types/IOrderItem";
import useOrder from "@/components/Admin/Order/hooks/useOrder";
import UserLoader from "@/components/Loader/UserLoader";
import { getAccountInfo } from "@/utils/AppUtil";

const Checkout = () => {
    const router = useRouter();
    const [addressForm] = Form.useForm();
    const [userForm] = Form.useForm();
    const { handleCreateOrderOnline } = useOrder();

    const [orderId] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cartData, isLoading, error } = useShoppingCart();
    const [cartItems] = useState(cartData);
    const [shippingFee, setShippingFee] = useState(0);
    const [selectedPayment, setSelectedPayment] = useState("CASH_AND_BANK_TRANSFER");
    const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null);
    const [selectedDistrictCode, setSelectedDistrictCode] = useState<string | null>(null);
    const [selectedWardCode, setSelectedWardsCode] = useState<string | null>(null);
    const [selectedProvinceName, setSelectedProvinceName] = useState<string | null>(null);
    const [selectedDistrictName, setSelectedDistrictName] = useState<string | null>(null);
    const [selectedWardName, setSelectedWardName] = useState<string | null>(null);
    const [detailAddress, setDetailAddress] = useState<string | null>(null);

    const handleShippingCostChange = (newCost: number) => setShippingFee(newCost);
    const handlePaymentChange = (value: string) => setSelectedPayment(value);
    const handleProvinceChange = (code: string, name: string | null) => {
        setSelectedProvinceCode(code);
        setSelectedProvinceName(name);
    };
    const handleDistrictChange = (code: string, name: string | null) => {
        setSelectedDistrictCode(code);
        setSelectedDistrictName(name);
    };
    const handleWardChange = (code: string, name: string | null) => {
        setSelectedWardsCode(code);
        setSelectedWardName(name);
    };
    const handleProvinceNameChange = (name: string | null) => setSelectedProvinceName(name);
    const handleDistrictNameChange = (name: string | null) => setSelectedDistrictName(name);
    const handleWardNameChange = (name: string | null) => setSelectedWardName(name);
    const handleDetailAddressChange = (address: string | null) => setDetailAddress(address);

    // Xử lý tạo thanh toán VNPay
    const processVNPayPayment = async (payment: any) => {
        const ipAddress = "127.0.0.1";
        try {
            const response = await createVNPayPayment(orderId, payment.totalAmount, ipAddress);

            if (response && response.paymentUrl) {
                window.location.href = response.paymentUrl;
            } else {
                console.error("Có lỗi khi tạo thanh toán, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi thanh toán VNPay:", error);
        }
    };

    // Xử lý đơn hàng và gửi request tói server
    const handleSubmit = async (payment: any) => {
        try {
            const userData = await userForm.validateFields(); // Dữ liệu từ form thông tin khách hàng
            const shippingFee = await payment.shippingFee; // Phí ship
            const voucherId = await payment.voucherId;
            const selectedPayment = await payment.selectedPayment; // Phương thức thanh toán
            const originalAmount = await payment.originalAmount; // Tổng tiền sản phẩm trong giỏ hàng (Chưa tính phí ship và voucher)
            const discountAmount = await payment.discountAmount; // Số tiền được giảm giá bởi voucher
            const totalAmount = await payment.totalAmount // Tổng tiền sản phẩm trong giỏ hàng (Đã tính toán bao gồm phí ship & voucher);
            // Map dữ liệu Order Item
            const cartFiltereds: ICreateOrUpdateOrderItem[] = cartItems && cartItems.length > 0 ? (cartItems.map((item: ICartItem) => {
                return {
                    productVariantId: item.productVariantId,
                    quantity: item.quantity,
                    salePrice: item.salePrice,
                    discountedPrice: 0,
                };
            })) : [];

            // Map dữ liệu Order + Order Item
            const email = getAccountInfo() ? getAccountInfo().email : userData.email;
            const pendingOrderData: IOrderOnlineCreateOrUpdate = {
                receiverName: userData.customerName,
                phoneNumber: userData.phone,
                email,
                originalAmount,
                discountAmount,
                shippingFee,
                totalAmount,
                voucherId,
                paymentMethod: selectedPayment,
                orderChannel: ORDER_CHANEL.ONLINE.key,
                orderType: ORDER_TYPE.DELIVERY.key,
                orderStatus: ORDER_STATUS.AWAITING_CONFIRMATION.key,
                isPrepaid: selectedPayment === PAYMENT_METHOD.BANK_TRANSFER.key,
                shippingAddress: JSON.stringify({
                    cityCode: selectedProvinceCode,
                    city: selectedProvinceName,
                    districtCode: selectedDistrictCode,
                    district: selectedDistrictName,
                    communeCode: selectedWardCode,
                    commune: selectedWardName,
                    addressName: detailAddress
                }),
                orderItems: cartFiltereds,
            };

            if (pendingOrderData.totalAmount < 0) return;

            if (selectedPayment === PAYMENT_METHOD.CASH_AND_BANK_TRANSFER.key) {
                // Xử lý đặt hàng với method COD
                await handleCreateOrderOnline(pendingOrderData)
                    .then((orderData) => {
                        // Xử lý kết quả thành công và chuyển hướng
                        if (orderData) {
                            const trackingNumber: string = orderData.orderTrackingNumber;
                            // Xoá data Cart
                            if (getAccountInfo()) {
                                deleteAllCartItems();
                            } else {
                                removeAllCartItems();
                            }
                            router.push('/order/success?tracking_number=' + trackingNumber);
                        }

                    })
                    .catch(() => {
                        // Xử lý chuyển hướng nếu có lỗi xảy ra
                        router.push('/order/error');
                    });
            } else if (selectedPayment === PAYMENT_METHOD.BANK_TRANSFER.key) {
                // Xử lý đặt hàng với method VNPay
                localStorage.setItem('pendingOrderData', JSON.stringify(pendingOrderData));
                await processVNPayPayment(payment);
            } else if (selectedPayment === "TEST") {
                // Xử lý đặt hàng với method nhận tại cửa hàng (Test)
                console.warn("Tính năng đang phát triển");
            } else {
                // Validate method
                console.error("Phương thức thanh toán không tồn tại!");
            }
        } catch (error) {
            // Lỗi xảy ra trong quá trình xử lý thanh toán
            console.warn("Xác thực không thành công:", error);
        }
    };

    // Validate giỏ hàng nếu có thay đổi từ phía server
    useEffect(() => {
        if (cartItems.length === 0) {
            router.push('/cart');
        }
    }, [cartItems, router]);

    const breadcrumbItems = [
        { title: 'Trang chủ', path: '/' },
        { title: 'Giỏ hàng', path: '/cart' },
        { title: 'Thanh toán' },
    ];

    return (
        <>
            {cartItems && cartItems.length > 0 ? (
                <>
                    <BreadcrumbSection items={breadcrumbItems} />
                    <section className="shop checkout section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 col-12">
                                    <CheckoutForm
                                        addressForm={addressForm}
                                        userForm={userForm}
                                        onShippingCostChange={handleShippingCostChange}
                                        selectedPayment={selectedPayment}
                                        onPaymentChange={handlePaymentChange}
                                        selectedProvinceCode={selectedProvinceCode}
                                        onProvinceChange={handleProvinceChange}
                                        selectedDistrictCode={selectedDistrictCode}
                                        onDistrictChange={handleDistrictChange}
                                        selectedWardCode={selectedWardCode}
                                        onWardChange={handleWardChange}
                                        selectedProvinceName={selectedProvinceName}
                                        onProvinceNameChange={handleProvinceNameChange}
                                        selectedDistrictName={selectedDistrictName}
                                        onDistrictNameChange={handleDistrictNameChange}
                                        selectedWardName={selectedWardName}
                                        onWardNameChange={handleWardNameChange}
                                        detailAddress={detailAddress}
                                        onDetailAddressChange={handleDetailAddressChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-12">
                                    <OrderDetail
                                        handleSubmit={handleSubmit}
                                        shippingFee={shippingFee}
                                        selectedPayment={selectedPayment}
                                        userForm={userForm}
                                        addressForm={addressForm}
                                        cartsProp={cartItems}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <div>
                    <UserLoader />
                </div>
            )}
        </>
    );
};

export default Checkout;
