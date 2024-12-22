"use client";

import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import OrderDetail from "./OrderDetail";
import { Form } from "antd";
import { createVNPayPayment } from "@/services/VNPayService";
import BreadcrumbSection from "@/components/Breadcrumb/BreadCrumb";

const Checkout = () => {
    const [addressForm] = Form.useForm();
    const [userForm] = Form.useForm();

    const [orderId, setOrderId] = useState("");
    const [shippingCost, setShippingCost] = useState(0);

    const handleShippingCostChange = (newCost: number) => setShippingCost(newCost);

    const processVNPayPayment = async (payment: any) => {
        const ipAddress = "127.0.0.1";
        try {
            const response = await createVNPayPayment(orderId, payment.totalAmount, ipAddress);

            if (response && response.paymentUrl) {
                window.location.href = response.paymentUrl;
            } else {
                alert("Có lỗi khi tạo thanh toán, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("VNPay Error:", error);
            alert("Lỗi thanh toán VNPay, vui lòng thử lại.");
        }
    };

    const handleSubmit = async (payment: any) => {
        try {
            const addressData = await addressForm.validateFields();
            const userData = await userForm.validateFields();

            console.log("Address Data:", addressData);
            console.log("User Data:", userData);

            if (payment.selectedPayment === "VNPay") {
                await processVNPayPayment(payment);
            } else {
                console.log("Processing other payment method:", payment.selectedPayment);
            }
        } catch (error) {
            console.warn("Validation Error:", error);
            alert("Vui lòng điền đầy đủ thông tin trước khi thanh toán.");
        }
    };

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
                            />
                        </div>
                        <div className="col-lg-4 col-12">
                            <OrderDetail
                                handleSubmit={handleSubmit}
                                shippingCost={shippingCost}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Checkout;
