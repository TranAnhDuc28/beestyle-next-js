'use client';

import React, { useEffect, useState } from 'react';
import { Divider, Menu } from 'antd';
import { LuFileUser } from 'react-icons/lu';
import { MdOutlineEditLocationAlt } from 'react-icons/md';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';
import AddressCard from './AddressCard';
import PurchasedProduct from './PurchasedProduct';
import useSWR from 'swr';
import { getDetailCustomer, URL_API_CUSTOMER } from '@/services/CustomerService';
import useAppNotifications from '@/hooks/useAppNotifications';

const UserProfile = () => {
    const [selectedMenu, setSelectedMenu] = useState('accountInfo');
    const {showNotification} = useAppNotifications();
    const [idCustomer,setIdCustomer] = useState<String|null>(null)


     // Lấy id từ localStorage
     useEffect(() => {
        const idString = localStorage.getItem("id");
        setIdCustomer(idString ? JSON.parse(idString) : 4);
    }, []);
    const {data, error, isLoading, mutate} = useSWR(
        `${URL_API_CUSTOMER.get}/${idCustomer}`,
        getDetailCustomer,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    useEffect(() => {
        if (error) {
            showNotification("error", {
                message: error?.message,
                description: error?.response?.data?.message || "Error fetching data",
            });
        }
    }, [error]);

    let result: ICustomer;
    if (!isLoading && data) {
        result = data?.data || {};
    }
    const renderContent = () => {
        if (isLoading) return <p>Đang tải dữ liệu...</p>;
        if (error) return <p>Có lỗi xảy ra khi tải dữ liệu.</p>;
        if (!data) return <p>Không tìm thấy thông tin khách hàng.</p>;
        switch (selectedMenu) {
            // Thông tin tài khoản
            case 'accountInfo':
                return (
                    <>
                        <Title level={3} className="text-center mb-6">Tài khoản của bạn</Title>
                        <div className='w-[40px] bg-black mx-auto h-1'></div>
                        <div>
                            <Title level={4} className="font-semibold">Thông tin tài khoản</Title>
                            <Divider className='m-0' />
                            {/* Tên khách hàng */}
                            <div className='text-black fw-semibold mt-2'>{result?.fullName}</div>

                            {/* Email */}
                            <div className='text-black my-1'>{result?.email}</div>

                            <Link href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedMenu('addressList');
                                }}
                                className="text-black underline hover:!text-orange-500"
                            >
                                Xem địa chỉ
                            </Link>

                            <PurchasedProduct idCustomer={idCustomer} />
                        </div>
                    </>
                );
            // Thông tin địa chỉ
            case 'addressList':
                return (
                    <>
                        <Title level={3} className="text-center mb-6">Thông tin địa chỉ</Title>
                        <div className='w-[40px] bg-black mx-auto h-1'></div>
                        <AddressCard idCustomer={idCustomer} phoneNumber={result.phoneNumber}/>
                    </>
                );
            default:
                return null;
        }
    };

    const handleMenuClick = ({ key }: { key: string }) => {
        setSelectedMenu(key);
    };

    return (
        <div className="container mx-auto my-10">
            <div className="grid grid-cols-4 gap-4">
                {/* Menu */}
                <Menu
                    mode="vertical"
                    className="col-span-1 border-0 mt-16"
                    onClick={handleMenuClick}
                    selectedKeys={[selectedMenu]}
                    items={[
                        { label: 'Thông tin tài khoản', key: 'accountInfo', icon: <LuFileUser size={15} /> },
                        { label: 'Danh sách địa chỉ', key: 'addressList', icon: <MdOutlineEditLocationAlt size={15} /> },
                    ]}
                />
                {/* Content */}
                <div className="col-span-3 pt-4 px-5 pb-5">{renderContent()}</div>
            </div>
        </div>
    );
};

export default UserProfile;
