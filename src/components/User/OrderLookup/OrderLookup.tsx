'use client';

import React from 'react';
import { Layout, Typography, Button, Input, Divider } from 'antd';
import BreadcrumbSection from '@/components/Breadcrumb/BreadCrumb';
import Paragraph from 'antd/es/typography/Paragraph';
import OrderStatus from './OrderStatus';
import OrderInfo from './OrderInfo';
import Image from 'next/image';

const { Content } = Layout;
const { Title, Text } = Typography;

const breadcrumbItems = [
    { title: 'Trang chủ', path: '/' },
    { title: 'Tra cứu đơn hàng' },
];

const OrderLookup: React.FC = () => {
    return (
        <>
            <BreadcrumbSection items={breadcrumbItems} />
            <Layout>
                <Content className="p-4 sm:p-6 lg:p-8">
                    <Title level={2} className="ps-5 bg-white rounded-lg text-center py-3">
                        Tra cứu đơn hàng
                    </Title>
                    <div className='w-full p-5 bg-white rounded-lg d-flex justify-center'>
                        <div className='me-5'>
                            <Title level={4}>Mã đơn hàng</Title>
                            <Paragraph className='text-gray-6'>(Nhập vào mã đơn hàng của bạn)</Paragraph>
                            <Input
                                placeholder="VD: 12345678"
                                maxLength={20}
                                size='large'
                            />
                            <Button
                                type='default'
                                className='bg-orange-500 text-white hover:!bg-orange-400 border-none w-full mt-3'
                            >
                                Tra cứu
                            </Button>
                        </div>
                        <div className='ms-5'>
                            <Image
                                width={300}
                                height={300}
                                src={'/ship_supported.png'}
                                alt='IMG'
                                unoptimized
                            />
                        </div>
                    </div>

                    {/*Result*/}
                    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md mt-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <Title level={4}>Chi tiết đơn hàng #12345678</Title>
                            </div>
                            <div>
                                <Text type="secondary">
                                    <strong>Thời gian đặt hàng: </strong> 11-12-2024 20:30:10
                                </Text>
                            </div>
                        </div>
                        <Divider className="my-4" />
                        <Text strong className="text-lg text-green-600">
                            Chờ giao hàng
                        </Text>
                        <OrderStatus currentStep={1} />
                        <OrderInfo />
                    </div>
                </Content>
            </Layout>
        </>
    );
};

export default OrderLookup;
