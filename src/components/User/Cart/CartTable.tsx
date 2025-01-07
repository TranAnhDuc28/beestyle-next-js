import React from "react";
import { Button, Card, Image, Typography } from "antd";
import QuantityControl from "@/components/User/Cart/Properties/QuantityControl";
import { CloseOutlined, FireOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import ProgressShipping from "./Properties/ProgressShipping";
import { removeItemFromCart } from "@/services/user/ShoppingCartService";
import useAppNotifications from "@/hooks/useAppNotifications";
import Link from "next/link";

const { Title, Text } = Typography;

const CartTable = ({ cartItems, updateCartItems }: { cartItems: any; updateCartItems: any }) => {
    const condition = 500000;
    const totalAmount = cartItems.reduce((total: number, item: { total_price: number; }) => total + item.total_price, 0);
    const promotionPrice = cartItems.reduce((total: number, item: { sale_price: number; discounted_price: number; quantity: number; }) => total + (item.sale_price - item.discounted_price) * item.quantity, 0);
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

    const handleRemoveCartItem = (cartId: string) => {
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

            <div
                className={promotionPrice && promotionPrice > 0
                    ? "bg-gray-100 p-3 rounded-lg mb-4 flex items-center" : "d-none"
                }
            >
                <FireOutlined className="text-red-500 text-xl mr-2" />
                <p className="m-0">
                    Khuyến mại trong giỏ hàng của bạn
                    <span className="text-red-500 font-bold ms-1">
                        {promotionPrice.toLocaleString()} đ
                    </span>
                </p>
            </div>

            <div style={{ maxHeight: '515px', overflowY: 'auto' }}>
                {cartItems.map((item: {
                    shopping_cart_id: string;
                    product_id: string;
                    image: { imageUrl: string };
                    product_name: string;
                    discounted_price: number;
                    sale_price: number;
                    color: string;
                    size: string;
                    quantity: number; quantityInStock: number;
                }, index: number) => (
                    <div key={index.toString()}>
                        <div className="float-end">
                            <Button
                                type="text"
                                onClick={() => handleRemoveCartItem(item.shopping_cart_id)}
                                icon={<CloseOutlined />}
                                className="ml-5"
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <Link href={`/product/${item.product_id}/variant`} passHref>
                                <Image
                                    width={160}
                                    height={"auto"}
                                    src={item.image ? item.image.imageUrl : ''}
                                    alt={item.product_name}
                                    className="rounded-lg"
                                    preview={false}
                                />
                            </Link>
                            <div className="ms-4">
                                <Title level={4} style={{ fontWeight: 500 }}>
                                    <Link
                                        href={`/product/${item.product_id}/variant`}
                                        passHref
                                        className="text-black hover:!text-orange-400"
                                    >
                                        {item.product_name}
                                    </Link>
                                </Title>
                                <Text className="text-red-500 text-xl font-bold">
                                    {item.discounted_price.toLocaleString()} đ
                                </Text>
                                <div style={item.sale_price > item.discounted_price ? {} : { visibility: 'hidden' }}>
                                    <p className="line-through text-gray-500">
                                        {item.sale_price.toLocaleString()} đ
                                    </p>
                                    <p className="text-red-500">
                                        <span
                                            style={{ color: "#333" }}
                                        >
                                            Đã tiết kiệm
                                        </span> -{(item.sale_price - item.discounted_price).toLocaleString()} đ
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p>{item.color} / {item.size}</p>
                                    <div className="justify-self-end">
                                        <QuantityControl
                                            quantity={item.quantity}
                                            quantityInStock={item.quantityInStock}
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
