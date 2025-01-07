/* eslint-disable @next/next/no-img-element */
'use client';

import React, { memo } from 'react';
import { Typography, Button } from 'antd';
import Link from 'next/link';
import UserFooter from '@/components/Footer/UserFooter';
import UserHeader from '@/components/Header/UserHeader';
import '@/css/user.css';

const { Title, Paragraph } = Typography;

function NotFound() {
    return (
        <>
            <UserHeader />
            <div className="flex flex-col items-center justify-start h-[610px] bg-gray-100">
                <div className="p-8 max-w-md w-full">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/404_page.webp"
                            alt="Trang không tìm thấy"
                            width={300}
                        />
                    </div>
                    <div className="text-center mb-4">
                        <Title level={3} className="text-gray-800">
                            Trang này không tồn tại
                        </Title>
                        <Paragraph className="text-gray-600">
                            Vui lòng kiểm tra đường dẫn của bạn hoặc quay về trang chủ BeeStyle.
                        </Paragraph>
                    </div>
                    <div className="text-center">
                        <Link href="/" passHref>
                            <Button type="primary" size="large" className="bg-black hover:!bg-orange-400 border-0">
                                Quay về trang chủ
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <UserFooter />
        </>
    );
}

export default memo(NotFound);
