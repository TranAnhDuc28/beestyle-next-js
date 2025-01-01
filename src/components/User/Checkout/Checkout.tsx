"use client";

import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import OrderDetail from "./OrderDetail";
import { Form } from "antd";
import { createVNPayPayment } from "@/services/VNPayService";
import { checkShoppingCartData } from "@/services/user/ShoppingCartService";
import BreadcrumbSection from "@/components/Breadcrumb/BreadCrumb";

const Checkout = () => {
    const [addressForm] = Form.useForm();
    const [userForm] = Form.useForm();

    const [orderId] = useState("");
    const [shippingCost, setShippingCost] = useState(0);
    const [selectedPayment, setSelectedPayment] = useState("COD");
    const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null);
    const [selectedDistrictCode, setSelectedDistrictCode] = useState<string | null>(null);
    const [selectedWardCode, setSelectedWardsCode] = useState<string | null>(null);
    const [selectedProvinceName, setSelectedProvinceName] = useState<string | null>(null);
    const [selectedDistrictName, setSelectedDistrictName] = useState<string | null>(null);
    const [detailAddress, setDetailAddress] = useState<string | null>(null);

    const handleShippingCostChange = (newCost: number) => setShippingCost(newCost);
    const handlePaymentChange = (value: string) => setSelectedPayment(value);
    const handleProvinceChange = (code: string) => setSelectedProvinceCode(code);
    const handleDistrictChange = (code: string) => setSelectedDistrictCode(code);
    const handleWardChange = (code: string) => setSelectedWardsCode(code);
    const handleProvinceNameChange = (name: string | null) => setSelectedProvinceName(name);
    const handleDistrictNameChange = (name: string | null) => setSelectedDistrictName(name);
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
            const addressData = await addressForm.validateFields();
            const userData = await userForm.validateFields();
            const combinedData = Object.assign({}, userData, addressData);
            // const jsonData = JSON.stringify(combinedData);

            console.log("Thông tin khách hàng:", combinedData);

            if (payment.selectedPayment === "VNPay") {
                await processVNPayPayment(payment);
            } else if (payment.selectedPayment === "Store") {
                console.warn("Tính năng đang phát triển");
            } else {
                console.log("Phương thức thanh toán:", payment.selectedPayment);
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
                                detailAddress={detailAddress}
                                onDetailAddressChange={handleDetailAddressChange}
                            />
                        </div>
                        <div className="col-lg-4 col-12">
                            <OrderDetail
                                handleSubmit={handleSubmit}
                                shippingCost={shippingCost}
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
