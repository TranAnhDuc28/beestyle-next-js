"use client";

import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import OrderDetail from "./OrderDetail";
import { Form } from "antd";
import { createVNPayPayment } from "@/services/VNPayService";
import { CART_KEY, checkShoppingCartData, ICartItem } from "@/services/user/ShoppingCartService";
import BreadcrumbSection from "@/components/Breadcrumb/BreadCrumb";
import { ORDER_CHANEL } from "@/constants/OrderChanel";
import { ORDER_TYPE } from "@/constants/OrderType";
import { ORDER_STATUS } from "@/constants/OrderStatus";
import { PAYMENT_METHOD } from "@/constants/PaymentMethod";

const Checkout = () => {
    const [addressForm] = Form.useForm();
    const [userForm] = Form.useForm();

    const [orderId] = useState("");
    const [cartItems] = useState(JSON.parse(localStorage.getItem(CART_KEY) || '[]'));
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

    const handleSubmit = async (payment: any) => {
        try {
            const userData = await userForm.validateFields();
            const totalAmount = await payment.totalAmount;
            const shippingFee = await payment.shippingFee;
            const selectedPayment = await payment.selectedPayment;
            const cartFiltereds: ICartItem[] = cartItems && cartItems.length > 0 ? (cartItems.map((item: ICartItem) => {
                return {
                    productVariantId: item.product_variant_id,
                    quantity: item.quantity,
                    salePrice: item.sale_price,
                    discountedPrice: item.sale_price === item.discounted_price ? 0 : item.discounted_price,
                };
            })) : [];

            const combinedData = {
                receiverName: userData.customerName,
                phoneNumber: userData.phone,
                email: userData.email,
                shippingFee: shippingFee,
                totalAmount: totalAmount,
                paymentMethod: selectedPayment,
                orderChanel: ORDER_CHANEL.ONLINE.key,
                orderType: ORDER_TYPE.DELIVERY.key,
                orderStatus: ORDER_STATUS.AWAITING_CONFIRMATION.key,
                isPrepaid: false,
                shippingAddress: {
                    cityCode: selectedProvinceCode,
                    city: selectedProvinceName,
                    districtCode: selectedDistrictCode,
                    district: selectedDistrictName,
                    communeCode: selectedWardCode,
                    commune: selectedWardName,
                    addressName: detailAddress
                },
                orderItems: cartFiltereds
            };

            if (selectedPayment === PAYMENT_METHOD.CASH_AND_BANK_TRANSFER.key) {
                console.log(JSON.stringify(combinedData, null, 2));
            } else if (selectedPayment === PAYMENT_METHOD.BANK_TRANSFER.key) {
                await processVNPayPayment(payment);
            } else if (selectedPayment === "TEST") {
                console.warn("Tính năng đang phát triển");
            } else {
                console.error("Phương thức thanh toán không tồn tại!");
            }
        } catch (error) {
            console.warn("Xác thực không thành công:", error);
        }
    };


    useEffect(() => {
        checkShoppingCartData();
    }, [])

    const breadcrumbItems = [
        { title: 'Trang chủ', path: '/' },
        { title: 'Giỏ hàng', path: '/cart' },
        { title: 'Thanh toán' },
    ];

    return (
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
                                selectedProvinceName={selectedProvinceName}
                                selectedDistrictName={selectedDistrictName}
                                selectedWardCode={selectedWardCode}
                                detailAddress={detailAddress}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Checkout;
