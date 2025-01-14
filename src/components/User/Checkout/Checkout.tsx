"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from 'next/navigation';
import OrderDetail from "./OrderDetail";
import {Alert, Col, Form, Input, Radio, Row} from "antd";
import {createVNPayPayment} from "@/services/VNPayService";
import {CART_KEY, checkShoppingCartData, ICartItem, removeAllCartItems} from "@/services/user/ShoppingCartService";
import BreadcrumbSection from "@/components/Breadcrumb/BreadCrumb";
import {ORDER_CHANEL} from "@/constants/OrderChanel";
import {ORDER_TYPE} from "@/constants/OrderType";
import {ORDER_STATUS} from "@/constants/OrderStatus";
import {PAYMENT_METHOD} from "@/constants/PaymentMethod";
import {IOrderOnlineCreateOrUpdate} from "@/types/IOrder";
import {ICreateOrUpdateOrderItem} from "@/types/IOrderItem";
import useOrder from "@/components/Admin/Order/hooks/useOrder";
import UserLoader from "@/components/Loader/UserLoader";
import {IAddress} from "@/types/IAddress";
import styles from "@/components/User/Checkout/css/checkout.module.css";
import {MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import {AiOutlineHome} from "react-icons/ai";
import {TbCreditCardPay} from "react-icons/tb";
import {RiStore2Line} from "react-icons/ri";
import SelectSearchOptionLabel from "@/components/Select/SelectSearchOptionLabel";
import TextArea from "antd/es/input/TextArea";
import useAddress from "@/components/Admin/Address/hook/useAddress";
import {ghtkCalculateShippingFee} from "@/services/GhtkCalculateShippingFee";
import {calculateShippingFee} from "@/utils/AppUtil";

const Checkout: React.FC = () => {
    const router = useRouter();
    const [addressForm] = Form.useForm();
    const [userForm] = Form.useForm();
    const {handleCreateOrderOnline} = useOrder();

    const [shippingAddress, setShippingAddress] = useState<IAddress | undefined>(undefined);

    const {handleGetProvinces, handleGetDistricts, handleGetWards} = useAddress();
    const provincesData = handleGetProvinces();
    const districtsData = handleGetDistricts(`${shippingAddress?.cityCode}`);
    const wardsData = handleGetWards(`${shippingAddress?.districtCode}`);

    const [orderId] = useState("");
    const [cartItems] = useState(JSON.parse(localStorage.getItem(CART_KEY) || '[]'));
    const [shippingFee, setShippingFee] = useState(0);
    const [selectedPayment, setSelectedPayment] = useState<string>(PAYMENT_METHOD.CASH_AND_BANK_TRANSFER.key);

    const handlePaymentChange = (e: any) => {
        const value = e.target.value;
        setSelectedPayment(value);
        if (value === PAYMENT_METHOD.CASH_AND_BANK_TRANSFER.key || value === PAYMENT_METHOD.BANK_TRANSFER.key) {
            addressForm.setFieldsValue({district: undefined, ward: undefined});
        }
    };

    const onChangeSelectedProvince = (provinceCode: string, province: any) => {
        setShippingAddress((prevState) => ({
            ...prevState,
            cityCode: Number(provinceCode),
            city: province?.label,
            districtCode: undefined,
            district: undefined,
            communeCode: undefined,
            commune: undefined
        } as IAddress));

        // Reset các trường district và ward trong form
        addressForm.setFieldsValue({
            district: undefined,
            ward: undefined,
        });
    }

    const onChangeSelectedDistrict = async (districtCode: string, district: any) => {
        setShippingAddress((prevState) => ({
            ...prevState,
            districtCode: Number(districtCode),
            district: district?.label,
            communeCode: undefined,
            commune: undefined
        } as IAddress));

        // Reset các trường district và ward trong form
        addressForm.setFieldsValue({
            ward: undefined,
        });
    }


    const onChangeSelectedWard = (wardCode: string, ward: any) => {
        setShippingAddress((prevState) => ({
            ...prevState,
            communeCode: Number(wardCode),
            commune: ward?.label
        } as IAddress));
    }

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

    /**
     * Tính phí vận chuyển
     */
    const fetchShippingFee = async () => {

        if (shippingAddress?.city && shippingAddress?.district) {
            try {
                const shippingFee = await calculateShippingFee(499999, shippingAddress);
                setShippingFee(shippingFee);
            } catch (error) {
                console.error("Error calculating shipping fee:", error);
            }
        }
    };

    useEffect(() => {
        fetchShippingFee();
        console.log(shippingFee)
    }, [shippingAddress?.city, shippingAddress?.district]);

    useEffect(() => {
        console.log(shippingAddress)
    }, [shippingAddress]);

    // Xử lý đơn hàng và gửi request tói server
    const handleSubmitOrderOnline = async (payment: any) => {
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
                    productVariantId: item.product_variant_id,
                    quantity: item.quantity,
                    salePrice: item.sale_price,
                    discountedPrice: item.sale_price === item.discounted_price ? 0 : item.discounted_price,
                };
            })) : [];

            // Map dữ liệu Order + Order Item
            const pendingOrderData: IOrderOnlineCreateOrUpdate = {
                receiverName: userData.customerName,
                phoneNumber: userData.phone,
                email: userData.email,
                originalAmount: originalAmount,
                discountAmount: discountAmount,
                shippingFee: shippingFee,
                totalAmount: totalAmount,
                voucherId: voucherId,
                paymentMethod: selectedPayment,
                orderChannel: ORDER_CHANEL.ONLINE.key,
                orderType: ORDER_TYPE.DELIVERY.key,
                orderStatus: ORDER_STATUS.AWAITING_CONFIRMATION.key,
                isPrepaid: selectedPayment === PAYMENT_METHOD.BANK_TRANSFER.key,
                shippingAddress: JSON.stringify({
                    addressName: addressForm.getFieldValue("addressName"),
                    cityCode: shippingAddress?.cityCode,
                    city: shippingAddress?.city,
                    districtCode: shippingAddress?.districtCode,
                    district: shippingAddress?.district,
                    communeCode: shippingAddress?.communeCode,
                    commune: shippingAddress?.commune
                }),
                orderItems: cartFiltereds
            };

            if (selectedPayment === PAYMENT_METHOD.CASH_AND_BANK_TRANSFER.key) {
                // Xử lý đặt hàng với method COD
                await handleCreateOrderOnline(pendingOrderData)
                    .then((orderData) => {
                        // Xử lý kết quả thành công và chuyển hướng
                        if (orderData) {
                            const trackingNumber: string = orderData.orderTrackingNumber;
                            removeAllCartItems(); // Xoá data Cart
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
        checkShoppingCartData();
    }, [cartItems, router]);

    const breadcrumbItems = [
        {title: 'Trang chủ', path: '/'},
        {title: 'Giỏ hàng', path: '/cart'},
        {title: 'Thanh toán'},
    ];

    return (
        <>
            {cartItems && cartItems.length > 0 ? (
                <>
                    <BreadcrumbSection items={breadcrumbItems}/>
                    <section className="shop checkout section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 col-12">
                                    <div className={styles["checkout-form"]}>
                                        <h3 className={styles["heading"]}>Thông tin người nhận</h3>
                                        <Form layout="horizontal" className={styles["form"]} form={userForm} action="#">
                                            <Form.Item
                                                name="customerName"
                                                rules={[{required: true, message: "Vui lòng nhập tên khách hàng!"}]}
                                            >
                                                <Input
                                                    placeholder="Tên khách hàng"
                                                    prefix={<UserOutlined className="pr-2"/>}
                                                    className={styles["input-checkout"]}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name="phone"
                                                rules={[{required: true, message: "Vui lòng nhập số điện thoại!"}]}
                                            >
                                                <Input
                                                    placeholder="Số điện thoại"
                                                    prefix={<PhoneOutlined className="pr-2"/>}
                                                    className={styles["input-checkout"]}
                                                />
                                            </Form.Item>

                                            <Form.Item name="email">
                                                <Input
                                                    placeholder="Địa chỉ email (Không bắt buộc)"
                                                    prefix={<MailOutlined className="pr-2"/>}
                                                    className={styles["input-checkout"]}
                                                />
                                            </Form.Item>
                                        </Form>

                                        <div className={`${styles["delivery-method"]} my-4`}>
                                            <h3 className={styles["heading"]}>Hình thức thanh toán</h3>
                                            <Radio.Group
                                                onChange={handlePaymentChange}
                                                value={selectedPayment}
                                                className={styles["delivery-radio-group"]}
                                            >
                                                <div>
                                                    <Radio.Button
                                                        value={PAYMENT_METHOD.CASH_AND_BANK_TRANSFER.key}
                                                        className={
                                                            `${styles["delivery-option"]} 
                                                        ${selectedPayment === PAYMENT_METHOD.CASH_AND_BANK_TRANSFER.key ? styles["selected"] : ""}`
                                                        }
                                                        style={{padding: '25px 5px', width: '190px'}}
                                                    >
                                                        <div
                                                            className="flex flex-col items-center justify-between text-center"
                                                            style={{marginTop: -15}}
                                                        >
                                                            <AiOutlineHome size={15}/>
                                                            <span style={{fontSize: 12, lineHeight: '20px'}}>Thanh toán khi nhận hàng (COD)</span>
                                                        </div>
                                                    </Radio.Button>
                                                </div>

                                                <div>
                                                    <Radio.Button
                                                        value="BANK_TRANSFER"
                                                        className={`${styles["delivery-option"]} ${selectedPayment === "BANK_TRANSFER" ? styles["selected"] : ""
                                                        }`}
                                                        style={{padding: '25px 0', width: '190px'}}
                                                    >
                                                        <div
                                                            className="flex flex-col items-center justify-center"
                                                            style={{marginTop: -15}}
                                                        >
                                                            <TbCreditCardPay size={15}/>
                                                            <span style={{fontSize: 12, lineHeight: '20px'}}>Thanh toán qua VNPay</span>
                                                        </div>
                                                    </Radio.Button>
                                                </div>

                                                <div>
                                                    <Radio.Button
                                                        value="TEST"
                                                        className={`${styles["delivery-option"]} ${selectedPayment === "TEST" ? styles["selected"] : ""
                                                        }`}
                                                        style={{padding: '25px 0', width: '190px'}}
                                                    >
                                                        <div
                                                            className="flex flex-col items-center justify-center"
                                                            style={{marginTop: -15}}
                                                        >
                                                            <RiStore2Line size={15}/>
                                                            <span style={{fontSize: 12, lineHeight: '20px'}}>Nhận tại cửa hàng</span>
                                                        </div>
                                                    </Radio.Button>
                                                </div>
                                            </Radio.Group>
                                        </div>

                                        {selectedPayment === "CASH_AND_BANK_TRANSFER" || selectedPayment === "BANK_TRANSFER" ? (
                                            <>
                                                <h3 className={styles["heading"] + " my-4"}>Địa chỉ nhận hàng</h3>
                                                <Form layout="horizontal" className={styles["form"]} form={addressForm}
                                                      action="#">
                                                    <Row gutter={16} className="mb-3">
                                                        <Col span={8}>
                                                            <Form.Item
                                                                name="province"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "Vui lòng chọn Tỉnh / Thành Phố!",
                                                                    },
                                                                ]}
                                                            >
                                                                <SelectSearchOptionLabel
                                                                    value={shippingAddress?.cityCode}
                                                                    placeholder="Tỉnh / Thành Phố"
                                                                    style={{width: "100%", height: "48px"}}
                                                                    data={provincesData?.dataOptionProvinces}
                                                                    isLoading={provincesData?.isLoading}
                                                                    onChange={onChangeSelectedProvince}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Form.Item
                                                                name="district"
                                                                rules={[{
                                                                    required: true,
                                                                    message: "Vui lòng chọn Quận / Huyện!"
                                                                }]}
                                                            >
                                                                <SelectSearchOptionLabel
                                                                    value={shippingAddress?.districtCode}
                                                                    placeholder="Quận / Huyện"
                                                                    style={{width: "100%", height: "48px"}}
                                                                    data={districtsData?.dataOptionDistricts}
                                                                    isLoading={districtsData?.isLoading}
                                                                    onChange={onChangeSelectedDistrict}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Form.Item
                                                                name="ward"
                                                                rules={[{
                                                                    required: true,
                                                                    message: "Vui lòng chọn Phường/ Xã!"
                                                                }]}
                                                            >
                                                                <SelectSearchOptionLabel
                                                                    value={shippingAddress?.communeCode}
                                                                    placeholder="Phường / Xã"
                                                                    style={{width: "100%", height: "48px"}}
                                                                    data={wardsData?.dataOptionWards}
                                                                    isLoading={wardsData?.isLoading}
                                                                    onChange={onChangeSelectedWard}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>

                                                    <Form.Item name="addressName" style={{marginTop: -10}}>
                                                        <TextArea
                                                            placeholder="Nhập địa chỉ chi tiết"
                                                            className="p-2"
                                                            rows={4}
                                                            style={{resize: 'none'}}
                                                            maxLength={250}
                                                        />
                                                    </Form.Item>
                                                </Form>
                                            </>
                                        ) : (
                                            <Alert
                                                message="Thử nghiệm"
                                                description="Tính năng này đang trong giai đoạn thử nghiệm, có thể hoạt động chưa ổn định."
                                                type="warning"
                                                className="mt-7"
                                                showIcon
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <OrderDetail
                                        handleSubmit={handleSubmitOrderOnline}
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
                    <UserLoader/>
                </div>
            )}
        </>
    );
}

export default Checkout;
