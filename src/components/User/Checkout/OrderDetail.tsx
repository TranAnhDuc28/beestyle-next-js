import Image from "next/image";
<<<<<<< HEAD
import {Button, Form, Radio} from "antd";
import React, {useState} from "react";
import {CART_KEY} from "@/services/user/ShoppingCartService";
=======
import { Button, Form, Radio } from "antd";
import React, { useState } from "react";
import styles from "@/css/user/styles/checkout.module.css";
import useAppNotifications from "@/hooks/useAppNotifications";
>>>>>>> bd863bb11b00ff64678b3fd8fe52d0d746457480

interface IProps {
  handleSubmit: (payement: string) => Promise<void>;
}

const OrderDetail = (props: IProps) => {
  const { handleSubmit } = props;
  const [selectedPayment, setSelectedPayment] = useState(null);

<<<<<<< HEAD
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

    const totalAmount = cartItems.reduce((total, item) => total + item.total_price, 0);

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value);
    };

    return (
        <div className="order-details">
            <div className="single-widget">
                <h2>THÔNG TIN</h2>
                <div className="content">
                    <ul>
                        <li>Tổng giá trị sản phẩm<span>{totalAmount} VND</span></li>
                        <li>Phí vận chuyển<span>30.000 VND</span></li>
                        <li>Voucher giảm giá<span className="text-danger"> - 5.000 VND</span></li>
                        <li className="last fs-6">Tổng thanh toán<span>{(totalAmount + 30000) - 5000} VND</span></li>
                        <li>
                            <span className="text-danger" style={{fontSize: 13}}>Bạn đã tiết kiệm được 5.000 đ</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="single-widget mt-5">
                <h2>Phương thức thanh toán</h2>
                <div className="content">
                    <div style={{margin: '15px 40px'}}>
                        <Radio.Group className="d-flex flex-column" onChange={handlePaymentChange}
                                     value={selectedPayment}>
                            <label className="checkbox-inline mb-2">
                                <Radio value="1">Chuyển khoản</Radio>
                            </label>
                            <label className="checkbox-inline mb-2">
                                <Radio value="2">Thanh toán khi nhận hàng (COD)</Radio>
                            </label>
                            <label className="checkbox-inline mb-2">
                                <Radio value="3">Cổng thanh toán VNPay</Radio>
                            </label>
                        </Radio.Group>
                    </div>
                </div>
            </div>
            <div className="single-widget payement">
                <div className="d-flex justify-content-center">
                    <Image width={280} height={36} alt="IMG" src="/payment-method.png"/>
                </div>
            </div>
            <div className="single-widget get-button">
                <div className="content">
                    <div className="button">
                        <Form.Item>
                            <Button className="btn btn-dark" htmlType="submit">
                                THANH TOÁN NGAY
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </div>
=======
  const { showNotification } = useAppNotifications();
  const handlePaymentChange = (e: any) => {
    setSelectedPayment(e.target.value);
  };
  const onButtonClick = async () => {
    // Kiểm tra nếu không có phương thức thanh toán được chọn
    if (!selectedPayment) {
      showNotification("error", {
        message: "Vui lòng chọn phương thức thanh toán!",
      });
      return;
    }

    // Gọi handleSubmit với payment đã chọn
    await handleSubmit(selectedPayment);
  };

  return (
    <div className="order-details">
      <div className="single-widget">
        <h2>THÔNG TIN</h2>
        <div className="content">
          <ul>
            <li>
              Tổng giá trị sản phẩm<span>330.000 VND</span>
            </li>
            <li>
              Phí vận chuyển<span>20.000 VND</span>
            </li>
            <li className="last fs-6">
              Tổng thanh toán<span>310.000 VND</span>
            </li>
            <li>
              <span className="text-danger" style={{ fontSize: 13 }}>
                Bạn đã tiết kiệm được 20.000 VND
              </span>
            </li>
          </ul>
>>>>>>> bd863bb11b00ff64678b3fd8fe52d0d746457480
        </div>
      </div>
      <div className="single-widget mt-5">
        <h2>Phương thức thanh toán</h2>
        <div className="content">
          <div style={{ margin: "15px 40px" }}>
            <Radio.Group
              className="d-flex flex-column"
              onChange={handlePaymentChange}
              value={selectedPayment}
            >
              <label className="checkbox-inline mb-2">
                <Radio value="1">Thanh toán khi nhận hàng</Radio>
              </label>
              <label className="checkbox-inline mb-2">
                <Radio value="2">VNPay</Radio>
              </label>
            </Radio.Group>
          </div>
        </div>
      </div>
      {/* <div className="single-widget payement">
        <div className="d-flex justify-content-center">
          <Image width={280} height={36} alt="IMG" src="/payment-method.png" />
        </div>
      </div> */}
      <div className="single-widget get-button">
        <div className="content">
          <div className="button5">
            <Button className="btn btn-dark" onClick={onButtonClick}>
              THANH TOÁN NGAY
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
