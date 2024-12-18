import React from 'react';
import { Col, Descriptions, Divider, Row, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
    id: number;
    productCode: string;
    productName: string;
    totalPrice: string;
    quantity: number;
    image: string;
}

const OrderInfo: React.FC = () => {
    const productData: Product[] = [
        {
            id: 1,
            productCode: 'SP001',
            productName: 'Laptop Asus Zenbook 14',
            totalPrice: '25,000,000 VND',
            quantity: 2,
            image: '',
        },
        {
            id: 2,
            productCode: 'SP002',
            productName: 'Chuột Logitech MX Master 3',
            totalPrice: '2,500,000 VND',
            quantity: 1,
            image: '',
        },
        {
            id: 3,
            productCode: 'SP003',
            productName: 'Bàn phím cơ Corsair K70 RGB',
            totalPrice: '4,000,000 VND',
            quantity: 1,
            image: '',
        }
    ];

    const columns: ColumnsType<Product> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Mã sản phẩm',
            dataIndex: 'productCode',
            key: 'productCode',
            render: (code) => code || '--',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (amount) => (
                <span className="text-orange-500 font-semibold">{amount}</span>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (imageUrl: string) => (
               <Image src={imageUrl} alt="Image" width={80} height={80}/>
            ),
        },
        {
            title: '',
            key: 'action',
            render: () => (
                <Link
                    href='#'
                    className='link-no-decoration hover:text-purple-600'
                    passHref
                >
                    Xem sản phẩm
                </Link>
            )
        },
    ];

    return (
        <>
            <Divider orientation="left" className="mt-4 text-lg font-semibold">
                Sản phẩm đã mua
            </Divider>
            <Table
                columns={columns}
                dataSource={productData}
                rowKey={(record) => record.id}
                pagination={{ pageSize: 5 }}
                bordered
            />
            <Row>
                <Col span={12} className="pr-4 ml-10">
                    <Divider orientation="left" className="text-lg font-semibold mt-0">
                        Thông tin khách hàng
                    </Divider>
                    <Descriptions
                        column={1}
                        layout="horizontal"
                        colon={false}
                        className="w-full"
                        labelStyle={{ width: '150px' }}
                    >
                        <Descriptions.Item label="Họ & tên:">Jonhhhhhhhhh</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại:">0123456789</Descriptions.Item>
                        <Descriptions.Item label="Email:">abc123@gmail.com</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ nhận hàng:">
                            9999, LALALA, VVAJAJS, 0000
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span={11} className="pr-4">
                    <Divider orientation="left" className="text-lg font-semibold mt-0">
                        Thông tin đơn hàng
                    </Divider>
                    <Descriptions
                        column={1}
                        layout="horizontal"
                        colon={false}
                        className="w-full"
                        labelStyle={{ width: '180px' }}
                    >
                        <Descriptions.Item label="Đơn giá:">990.000đ</Descriptions.Item>
                        <Descriptions.Item label="Phương thức thanh toán:">Thanh toán khi nhận hàng</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái thanh toán:">Chưa thanh toán</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái giao hàng">Chờ xác nhận</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </>
    );
};

export default OrderInfo;
