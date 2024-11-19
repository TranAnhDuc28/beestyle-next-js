"use client";
import { Form } from "antd";
import CheckoutForm from "./CheckoutForm";
import OrderDetail from "./OrderDetail";
import { useState } from "react";
import { createVNPayPayment } from "@/services/VNPayService";
import useAppNotifications from "@/hooks/useAppNotifications";

const Checkout = () => {
  const [addressForm] = Form.useForm();
  const [userForm] = Form.useForm();

  const { showNotification } = useAppNotifications();
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState(200000);
  const [selectedBank, setSelectedBank] = useState("NCB");

  const handleSubmit = async (payment: string) => {
    try {
      // Validate addressForm
      //   const addressValues = await addressForm.validateFields();
      //   console.log("Address Form Values:", addressValues);

      //   // Validate userForm
      //   const userValues = await userForm.validateFields();
      //   console.log("User Form Values:", userValues);
      console.log(payment);

      if (payment == "2") {
        try {
          const ipAddress = "127.0.0.1"; // Thay bằng IP thực tế của client
          const data = await createVNPayPayment(
            orderId,
            amount,
            ipAddress,
            selectedBank
          );

          if (data && data.paymentUrl) {
            console.log("Redirecting to VNPay payment URL:", data.paymentUrl);
            window.location.href = data.paymentUrl;
          } else {
            console.error("Không có paymentUrl trong dữ liệu trả về.");
            showNotification("error", {
              message: "Lỗi tạo thanh toán, vui lòng thử lại.",
            });
            showNotification("error",{
              message: "Lỗi tạo thanh toán, vui lòng thử lại."
          });
          }
        } catch (error) {
          console.error("Lỗi khi tạo thanh toán:", error);
          showNotification("error",{
            message:"Đã xảy ra lỗi trong quá trình thanh toán, vui lòng thử lại."
        });
        }
      }
    } catch (error) {
      // Nếu có lỗi (form không hợp lệ), thông báo cho người dùng
      console.log("Form validation failed:", error);
    }
  };
  return (
    <section className="shop checkout section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12">
            <CheckoutForm addressForm={addressForm} userForm={userForm} />
          </div>
          <div className="col-lg-4 col-12">
            <OrderDetail handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
