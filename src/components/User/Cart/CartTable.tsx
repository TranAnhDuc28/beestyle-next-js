import React from "react";
import Image from "next/image";
import { Button, Card, Typography } from "antd";
import QuantityControl from "@/components/User/Cart/Properties/QuantityControl";
import { CloseOutlined, FireOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import ProgressShipping from "./Properties/ProgressShipping";
import { removeItemFromCart } from "@/services/user/ShoppingCartService";
import useAppNotifications from "@/hooks/useAppNotifications";

const { Title, Text } = Typography;

const CartTable = ({ cartItems, updateCartItems }: any) => {
    const condition = 500000;
    const totalAmount = cartItems.reduce((total, item) => total + item.total_price, 0);
    const { showNotification, showModal } = useAppNotifications();

    const handleQuantityChange = (index: number, operation: 'increment' | 'decrement') => {
        const newCartItems = [...cartItems];
        const item = newCartItems[index];

        if (operation === 'increment') {
            item.quantity = Math.min(item.quantity + 1, item.product_quantity);
        } else if (operation === 'decrement') {
            item.quantity = Math.max(item.quantity - 1, 1);
        }

        item.total_price = item.quantity * item.discounted_price;
        newCartItems[index] = item;

        updateCartItems(newCartItems);
    };

    const handleRemoveCartItem = (cartId: number) => {
        showModal('confirm', {
            title: 'Xoá sản phẩm',
            content: 'Bạn chắc chắn muốn xoá sản phẩm này?',
            icon: (<QuestionCircleOutlined style={{ color: 'red' }} />),
            centered: true,
            okText: 'Xoá',
            cancelText: 'Không',
            onOk() {
                removeItemFromCart(cartId);
                showNotification('success', {
                    message: (<span className="fw-semibold fs-6">Đã gỡ sản phẩm khỏi giỏ hảng</span>),
                    placement: 'topRight',
                    duration: 3,
                    rtl: true,
                })
            }
        })
    }

    return (
        <Card className="rounded-lg shadow-md mb-4">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ProgressShipping totalAmount={totalAmount} condition={condition} />
            </div>

            <div className="bg-gray-100 p-3 rounded-lg mb-4 flex items-center">
                <FireOutlined className="text-red-500 text-xl mr-2" />
                <p className="m-0">
                    Khuyến mại trong giỏ hàng của bạn
                    <span className="text-red-500 font-bold ms-1">
                        {cartItems.reduce((total, item) =>
                            total + (item.original_price - item.discounted_price) * item.quantity, 0).toLocaleString()} đ
                    </span>
                </p>
            </div>

            <div style={{ maxHeight: '515px', overflowY: 'auto' }}>
                {cartItems.map((item, index) => (
                    <div key={index.toString()}>
                        <div className="float-end">
                            <Button
                                type="text"
                                onClick={() => handleRemoveCartItem(item.shopping_cart_id)}
                                icon={<CloseOutlined />}
                                className="ml-5"
                            />
                        </div>
                        <div className="flex mb-4">
                            <Image
                                width={130}
                                height={100}
                                src={item.images[0].imageUrl}
                                alt={item.product_name}
                                className="rounded-lg mr-4"
                                layout="intrinsic"
                                unoptimized
                            />
                            <div>
                                <Title level={4} style={{ fontWeight: 500 }}>{item.product_name}</Title>
                                <Text className="text-red-500 text-xl font-bold">
                                    {item.discounted_price.toLocaleString()} đ
                                </Text>
                                <p className="line-through text-gray-500">{item.original_price.toLocaleString()} đ</p>
                                <p className="text-red-500">
                                    <span
                                        style={{ color: "#333" }}>Đã tiết kiệm</span> -{(item.original_price - item.discounted_price).toLocaleString()} đ
                                </p>
                                <div className="grid grid-cols-2 items-center">
                                    <p className="m-0">{item.color} / {item.size}</p>
                                    <div className="justify-self-end mt-[-8px]">
                                        <QuantityControl
                                            value={item.quantity}
                                            onChange={() => handleQuantityChange(index, 'decrement')}
                                            onIncrement={() => handleQuantityChange(index, 'increment')}
                                            onDecrement={() => handleQuantityChange(index, 'decrement')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default CartTable;
