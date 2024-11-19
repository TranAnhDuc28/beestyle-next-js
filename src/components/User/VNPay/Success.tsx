'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Result } from 'antd';

const SuccessPage: React.FC = () => {
  const router = useRouter();

  const handleViewOrder = () => {
    router.push('/orders'); // Redirect đến trang quản lý đơn hàng
  };

  return (
    <div className='my-[150px]'>
      <Result
        status="success"
        title="Giao dịch thành công"
        subTitle="Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đã được ghi nhận."
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
