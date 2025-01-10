'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useOrder from '@/components/Admin/Order/hooks/useOrder';
import UserLoader from '@/components/Loader/UserLoader';
import { removeAllCartItems } from '@/services/user/ShoppingCartService';

const VNPayConfirmPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { handleCreateOrderOnline } = useOrder();
    const paymentStatus = searchParams.get('vnp_ResponseCode');
    const hasCalledApi = useRef(false);

    useEffect(() => {
        if (paymentStatus === '00' && !hasCalledApi.current) {
            const handlePaymentResult = async () => {
                hasCalledApi.current = true; // Tạo Flag checkpoint
                const combinedDataString = localStorage.getItem('pendingOrderData');
                if (combinedDataString) {
                    const pendingOrderData = JSON.parse(combinedDataString);
                    try {
                        const result = await handleCreateOrderOnline(pendingOrderData);
                        if (result.success === false) {
                            throw new Error(result.message);
                        }

                        localStorage.removeItem('pendingOrderData');
                        removeAllCartItems(); // Xoá data Cart

                        const trackingNumber = result.orderTrackingNumber;
                        router.push(`/order/success?tracking_number=${trackingNumber}`);
                    } catch (error) {
                        console.error("Lỗi khi tạo đơn hàng sau thanh toán:", error);
                        router.push('/order/error');
                    }
                } else {
                    console.error("Không tìm thấy dữ liệu đơn hàng tạm thời.");
                    router.push('/order/error');
                }
            };
            handlePaymentResult();
        } else if (paymentStatus === '24') {
            router.push('/order/cancel');
        } else if (paymentStatus && paymentStatus !== '00') {
            router.push('/order/error');
        }
    }, [paymentStatus, router, handleCreateOrderOnline]);


    return (
        <div>
            <UserLoader />
        </div>
    );
};

export default VNPayConfirmPage;
