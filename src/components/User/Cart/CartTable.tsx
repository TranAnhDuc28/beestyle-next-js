import React from "react";
import Image from "next/image";
import {Card, Typography} from "antd";
import QuantityControl from "@/components/User/Cart/QuantityControl";
import {FireOutlined} from "@ant-design/icons";
import ProgressShipping from "./ProgressShipping";

const {Title, Text} = Typography;

const CartTable = ({cartItems, updateCartItems}: any) => {
    const condition = 498000;
    const totalAmount = cartItems.reduce((total, item) => total + item.total_price, 0);

    const handleQuantityChange = (index: number, operation: 'increment' | 'decrement') => {
        const newCartItems = [...cartItems];
        const item = newCartItems[index];

        if (operation === 'increment') {
            item.quantity = Math.min(item.quantity + 1, 1000);
        } else if (operation === 'decrement') {
            item.quantity = Math.max(item.quantity - 1, 1);
        }

        item.total_price = item.quantity * item.discounted_price;
        newCartItems[index] = item;

        updateCartItems(newCartItems);
    };

    console.log(cartItems)

    return (
        <Card className="rounded-lg shadow-md mb-4">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ProgressShipping totalAmount={totalAmount} condition={condition} />
            </div>

            {/* <div className="bg-gray-100 p-3 rounded-lg mb-4 flex items-center">
                <FireOutlined className="text-red-500 text-xl mr-2"/>
                <p className="m-0">
                    Khuyến mại trong giỏ hàng của bạn chỉ còn trong{' '}
                    <span className="text-red-500 font-bold">9 phút 56 giây</span>
                </p>
            </div> */}

            {cartItems.map((item, index) => (
                <div key={index.toString()}>
                    <div className="flex mb-4">
                        <Image
                            width={130}
                            height={100}
                            src={item.images[0].imageUrl}
                            alt={item.product_name}
                            className="rounded-lg mr-4"
                            unoptimized
                        />
                        <div>
                            <Title level={4} style={{fontWeight: 500}}>{item.product_name}</Title>
                            <Text className="text-red-500 text-xl font-bold">
                                {item.discounted_price.toLocaleString('vi-VN')} đ
                            </Text>
                            <p className="line-through text-gray-500">{item.original_price.toLocaleString('vi-VN')} đ</p>
                            <p className="text-red-500">
                                <span
                                    style={{color: "#333"}}>Đã tiết kiệm</span> -{(item.original_price - item.discounted_price).toLocaleString('vi-VN')} đ
                            </p>
                            <div className="flex">
                                <p className="m-0"> {item.color} / {item.size} </p>
                                <div style={{marginLeft: 450, marginTop: -8}}>
                                    <QuantityControl
                                        value={item.quantity}
                                        onChange={(value) => handleQuantityChange(index, 'decrement')}
                                        onIncrement={() => handleQuantityChange(index, 'increment')}
                                        onDecrement={() => handleQuantityChange(index, 'decrement')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Card>
    );
}

export default CartTable;
