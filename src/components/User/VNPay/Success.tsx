'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Result } from 'antd';

const SuccessPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    const handleViewOrder = () => {
        router.push('/orders'); // Redirect đến trang quản lý đơn hàng
    };

    return (
        <div className='my-[150px]'>
            <Result
                status="success"
                title="Giao dịch thành công"
                subTitle={
                    <div>
                        <p>Mã đơn hàng: {orderId}</p>
                        Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đã được ghi nhận.
                    </div>
                }
                extra={
                    <Button type="primary" onClick={handleViewOrder}>
                        Xem đơn hàng
                    </Button>
                }
            />
        </div>
    );
};

export default SuccessPage;
