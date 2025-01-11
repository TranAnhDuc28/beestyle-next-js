'use client';

import React, { useState } from 'react';
import { Divider, Menu } from 'antd';
import { LuFileUser } from 'react-icons/lu';
import { MdOutlineEditLocationAlt } from 'react-icons/md';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';
import AddressCard from './AddressCard';
import PurchasedProduct from './PurchasedProduct';

const UserProfile = () => {
    const [selectedMenu, setSelectedMenu] = useState('accountInfo');

    const renderContent = () => {
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
                            <div className='text-black fw-semibold mt-2'>Nguyen Van A</div>

                            {/* Email */}
                            <div className='text-black my-1'>abc123@gmail.com</div>

                            <Link href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedMenu('addressList');
                                }}
                                className="text-black underline hover:!text-orange-500"
                            >
                                Xem địa chỉ
                            </Link>

                            <PurchasedProduct />
                        </div>
                    </>
                );
            // Thông tin địa chỉ
            case 'addressList':
                return (
                    <>
                        <Title level={3} className="text-center mb-6">Thông tin địa chỉ</Title>
                        <div className='w-[40px] bg-black mx-auto h-1'></div>
                        <AddressCard />
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
