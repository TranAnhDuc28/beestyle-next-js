import React from 'react';
import { Button, Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

const PurchasedProduct = () => {
    const dataSource = [
        {
            key: '1',
            productName: 'Áo thun nam cổ tròn',
            quantity: 2,
            price: 150000,
            paymentFee: 5000,
        },
        {
            key: '2',
            productName: 'Quần jean nữ ống loe',
            quantity: 1,
            price: 320000,
            paymentFee: 0,
        },
        {
            key: '3',
            productName: 'Giày thể thao unisex',
            quantity: 3,
            price: 450000,
            paymentFee: 10000,
        },
        {
            key: '4',
            productName: 'Mũ lưỡi trai',
            quantity: 5,
            price: 75000,
            paymentFee: 2000,
        },
    ];

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            width: 50,
            align: 'center',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={`https://via.placeholder.com/50x50?text=${text.substring(0, 2)}`}
                        alt={text}
                        style={{ width: 50, height: 50, marginRight: 10 }}
                    />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            width: 100,
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            width: 150,
            render: (text) => `${text.toLocaleString()} đ`,
        },
        {
            title: 'Phí thanh toán',
            dataIndex: 'paymentFee',
            key: 'paymentFee',
            align: 'right',
            width: 150,
            render: (text) => `${text.toLocaleString()} đ`,
        },
        {
            title: '',
            key: 'action',
            align: 'center',
            width: 100,
            render: (_, record) => (
                <Button
                    type="default"
                    // onClick={() => handleView(record)}
                    icon={<EyeOutlined />}
                    className="!border-none !text-white !bg-purple-500 hover:!bg-purple-600"
                >
                </Button>
            ),
        },
    ];

    return (
        <>
            {dataSource && dataSource.length > 0 ? (
                <div>
                    <Title level={4} className="font-semibold mt-5">Sản phẩm đã mua</Title>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={{
                            pageSize: 5,
                        }}
                        bordered
                    />
                </div>
            ) : (
                <div
                    className='mt-5'
                    style={{ border: '8px solid #D9EDF7' }}
                >
                    <span className='block p-2'>Bạn chưa đặt mua sản phẩm.</span>
                </div>
            )}
        </>
    );
};

export default PurchasedProduct;
