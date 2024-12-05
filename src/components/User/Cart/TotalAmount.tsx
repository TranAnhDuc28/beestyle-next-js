import React from 'react';
import {Button, Card, Col, Form, Input, Row, Typography} from "antd";
import Link from "next/link";
import Image from "next/image";

const {Title, Text} = Typography;

const TotalAmount = ({cartItems}: any) => {

    const {Text} = Typography;

    const totalAmount = cartItems.reduce((total, item) => total + item.total_price, 0);

    return (
        <>
            <Card className="rounded-lg shadow-md">
                <Title level={3} className="text-xl font-bold mb-4">Thông tin đơn hàng</Title>
                <div className="flex justify-between mb-2">
                    <Text>Tổng giá trị sản phẩm</Text>
                    <Text>{totalAmount.toLocaleString('vi-VN')} đ</Text>
                </div>
                <div className="flex justify-between mb-2">
                    <Text>Vận chuyển</Text>
                    <Text>30.000 đ</Text>
                </div>
                <div className="flex justify-between mb-4">
                    <Text>Giảm giá vận chuyển</Text>
                    <Text className="text-red-600">-30.000 đ</Text>
                </div>
                <div className="mb-4">
                    <div className="flex justify-between align-middle">
                        <Title level={4}>Tổng thanh toán</Title>
                        <Text className="text-xl font-semibold">
                            {totalAmount.toLocaleString('vi-VN')} đ
                        </Text>
                    </div>
                    <p className="text-red-500 float-end">
                        Bạn đã tiết kiệm được 30.000 đ
                    </p>
                </div>
                <Button
                    type="primary"
                    className="text-black w-full py-4 text-lg font-medium"
                    style={{backgroundColor: "#FCAF17"}}
                >
                    Mua hàng
                </Button>
                <p className="text-center text-green-500 mt-4">Chọn Voucher giảm giá ở bước tiếp theo</p>
                    <Image
                        src={"/payment-variant.png"}
                        width={400}
                        height={200}
                        alt="IMG"
                        unoptimized
                    />
            </Card>
        </>
    );
};

export default TotalAmount;
