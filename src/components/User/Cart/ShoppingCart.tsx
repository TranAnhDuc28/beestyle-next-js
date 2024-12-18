'use client';

import React, { useEffect, useState } from 'react';
import CartTable from "@/components/User/Cart/CartTable";
import TotalAmount from "@/components/User/Cart/TotalAmount";
import { CART_KEY } from "@/services/user/ShoppingCartService";
import { Typography } from 'antd';
import BreadcrumbSection from '@/components/Breadcrumb/BreadCrumb';

const { Title } = Typography;

const ShoppingCart = () => {

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem(CART_KEY) || '[]'));

    useEffect(() => {
        const handleCartUpdate = () => {
            setCartItems(JSON.parse(localStorage.getItem(CART_KEY) || '[]'));
        };
        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const updateCartItems = (newCartItems: any) => {
        setCartItems(newCartItems);
        localStorage.setItem(CART_KEY, JSON.stringify(newCartItems));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const breadcrumbItems = [
        { title: 'Trang chủ', path: '/' },
        { title: 'Giỏ hàng' },
    ];

    return (
        <>
            <BreadcrumbSection items={breadcrumbItems} />
            <div
                className="container bg-white mt-5"
                style={{
                    padding: 5,
                    borderRadius: 5
                }}
            >
                <Title level={3} className="text-2xl font-bold ms-4 mt-3">Giỏ hàng</Title>
            </div>
            <div className="container max-w-5xl mx-auto py-2 ps-0 pe-4 d-flex">
                <div className="col-lg-8 me-4">
                    <CartTable cartItems={cartItems} updateCartItems={updateCartItems} />
                </div>
                <div className="col-lg-4">
                    <TotalAmount cartItems={cartItems} />
                </div>
            </div>
        </>
    );
};

export default ShoppingCart;
