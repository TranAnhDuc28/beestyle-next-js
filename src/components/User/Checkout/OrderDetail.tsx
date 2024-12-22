import { Button, Form, Radio } from "antd";
import React, { useState } from "react";
import { CART_KEY } from "@/services/user/ShoppingCartService";
import useAppNotifications from "@/hooks/useAppNotifications";
import { RiDiscountPercentLine } from "react-icons/ri";
import DiscountCodeModal from "../Discount/DiscountCodeModal";

interface IProps {
    handleSubmit: (payment: any) => Promise<void>;
    shippingCost: number;
}

const OrderDetail = (props: IProps) => {
    const { handleSubmit, shippingCost } = props;
    const { showNotification } = useAppNotifications();
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const cartItems = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

    const productTotal = cartItems.reduce((total: any, item: any) => total + item.total_price, 0);
    const totalAmount = productTotal >= 500000 ? productTotal : productTotal + shippingCost;
    const savings = 0;

    const handlePaymentChange = (e: any) => setSelectedPayment(e.target.value);

    const onButtonClick = async () => {
        if (!selectedPayment) {
            showNotification("error", { message: "Vui lòng chọn phương thức thanh toán!" });
            return;
        }
        await handleSubmit({ selectedPayment, totalAmount, shippingCost });
    };

    return (
        <>
            <div className="p-5 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Thông tin đơn hàng</h3>
                </div>

                <div className="space-y-2 text-sm pb-2 border-b">
                    <div className="flex justify-between">
                        <span>Tổng giá trị sản phẩm</span>
                        <span>{productTotal.toLocaleString()} đ</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Vận chuyển</span>
                        <span>{shippingCost.toLocaleString()} đ</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                        <span>Giảm giá vận chuyển</span>
                        <span>{productTotal >= 500000 ? `- ${shippingCost.toLocaleString()} đ` : '0 đ'}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Tổng thanh toán</span>
                        <span>{totalAmount.toLocaleString()} đ</span>
                    </div>
                    <p className="text-red-500 text-xs mt-2">
                        Bạn đã tiết kiệm được {savings.toLocaleString()} đ
                    </p>
                    <div className="bg-blue-50 p-1 rounded-lg mb-4 mt-4 flex justify-between items-center">
                        <p className="font-medium mt-3 ms-3 flex items-center">
                            <RiDiscountPercentLine size={20} className="me-1" /> Mã giảm giá
                        </p>
                        <Button
                            type="link"
                            className="text-blue-500"
                            onClick={openModal}
                        >
                            Chọn mã {">"}
                        </Button>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="mb-3">Phương thức thanh toán</h3>
                    <Radio.Group onChange={handlePaymentChange} value={selectedPayment} className="flex flex-col gap-2">
                        <Radio value="COD">Thanh toán khi nhận hàng (COD)</Radio>
                        <Radio value="VNPay">Cổng thanh toán VNPay</Radio>
                    </Radio.Group>
                </div>

                <div className="mt-6 text-center">
                    <Form.Item>
                        <Button
                            type="primary"
                            size="large"
                            className="w-full bg-black hover:!bg-orange-400"
                            onClick={onButtonClick}
                        >
                            THANH TOÁN NGAY
                        </Button>
                    </Form.Item>
                </div>
            </div>
            <DiscountCodeModal
                isVisible={isModalVisible}
                onClose={closeModal}
            />
        </>
    );
};

export default OrderDetail;
