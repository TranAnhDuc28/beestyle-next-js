import { Button, Form, FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { CART_KEY } from "@/services/user/ShoppingCartService";
import useAppNotifications from "@/hooks/useAppNotifications";
import { RiDiscountPercentLine } from "react-icons/ri";
import DiscountCodeModal from "../Discount/DiscountCodeModal";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface IProps {
    handleSubmit: (payment: any) => Promise<void>;
    shippingFee: number;
    selectedPayment: string;
    userForm: FormInstance;
    addressForm: FormInstance;
    selectedProvinceName: string | null;
    selectedDistrictName: string | null;
    selectedWardCode: string | null;
    detailAddress: string | null;
}

const OrderDetail = (props: IProps) => {
    const {
        handleSubmit,
        shippingFee,
        selectedPayment,
        // userForm,
        // addressForm,
        // selectedProvinceName,
        // selectedDistrictName,
        // selectedWardCode,
        // detailAddress,
    } = props;
    const router = useRouter();
    const { showModal } = useAppNotifications();
    const { showNotification } = useAppNotifications();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);


    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCartItems = localStorage.getItem(CART_KEY);
            return storedCartItems ? JSON.parse(storedCartItems) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    });

    useEffect(() => {
        const handleStorageChange = () => {
            try {
                const storedCartItems = localStorage.getItem(CART_KEY);
                setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
            } catch (error) {
                console.error(error);
                setCartItems([]);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const productTotal = cartItems.reduce((total: number, item: any) => total + item.total_price, 0);
    const totalAmount = productTotal >= 500000 ? productTotal : productTotal + shippingFee;
    const savings = 0;

    const onButtonClick = async () => {
        if (cartItems.length === 0) {
            router.push('/cart');
            return;
        } else if (!selectedPayment) {
            showNotification("error", { message: "Vui lòng chọn phương thức thanh toán!" });
            return;
        } else {
            try {
                await props.userForm.validateFields();
                await props.addressForm.validateFields();

                showModal('confirm', {
                    title: 'Xác nhận đặt hàng',
                    content: 'Bạn có muốn xác nhận đơn hàng này?',
                    icon: (<QuestionCircleOutlined style={{ color: 'blue' }} />),
                    centered: true,
                    okText: 'Xác nhận',
                    cancelText: 'Huỷ bỏ',
                    onOk: async () => {
                        const data = {
                            shippingFee,
                            totalAmount,
                            selectedPayment
                        }
                        await handleSubmit({ ...data });
                    }
                });
            } catch (errorInfo) {
                console.log('Failed:', errorInfo);
            }
        }
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
                        <span>{shippingFee.toLocaleString()} đ</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                        <span>Giảm giá vận chuyển</span>
                        <span>{productTotal >= 500000 ? `- ${shippingFee.toLocaleString()} đ` : '0 đ'}</span>
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
                    <h3 className="mb-3">:::</h3>
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
