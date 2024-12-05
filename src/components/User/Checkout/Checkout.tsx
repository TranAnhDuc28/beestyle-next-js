"use client"


import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import OrderDetail from "./OrderDetail";
import { Form } from "antd";
import { createVNPayPayment } from "@/services/VNPayService";
import TestPDFComponent from "../Invoice/TestPDF";

const Checkout = () => {
  const [addressForm] = Form.useForm();
  const [userForm] = Form.useForm();

  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState(200000);
  const [shippingCost, setShippingCost] = useState(0);

  const handleShippingCostChange = (newCost: number) => {
    setShippingCost(newCost);
  };

  const handleSubmit = async (payment: string) => {
    try {
      // Xác thực và lấy dữ liệu từ cả hai form
      const addressData = await addressForm.validateFields();
      const userData = await userForm.validateFields();

      console.log("Address Form Data:", addressData);
      console.log("User Form Data:", userData);
      console.log(payment);

      if (payment.selectedPayment === "3") {
        try {
          const ipAddress = "127.0.0.1"; // Địa chỉ IP tạm thời
          const data = await createVNPayPayment(orderId, amount, ipAddress);
          console.log(data);
          
          if (data && data.paymentUrl) {
            // Chuyển hướng người dùng tới VNPay
            window.location.href = data.paymentUrl;
          } else {
            alert("Có lỗi khi tạo thanh toán, vui lòng thử lại.");
          }
        } catch (error) {
          alert("Lỗi thanh toán, vui lòng thử lại.");
        }
      }
    } catch (error) {
      // console.log("Xác thực form thất bại:", error);
    }
  };
  const formatDate = (date: Date) => {
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  const [invoiceData, setInvoiceData] = useState({
    customerName: "Nguyễn Văn A",
    products: [
      { productId: "P001", productName: "Sản phẩm A", quantity: 2, price: 100000 },
      { productId: "P002", productName: "Sản phẩm B", quantity: 1, price: 150000 },
    ],
    totalAmount: 350000,
    orderDate: formatDate(new Date() )
  });

  return (
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
        <TestPDFComponent invoiceData={invoiceData} />
      </div>
    </section>
  );
};

export default Checkout;

