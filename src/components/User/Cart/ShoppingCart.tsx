'use client';

import React, {useEffect, useState} from 'react';
import CartTable from "@/components/User/Cart/CartTable";
import TotalAmount from "@/components/User/Cart/TotalAmount";
import {CART_KEY} from "@/services/user/ShoppingCartService";
import BreadcrumbSection from "@/components/Button/BreadCrumb";

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
        { title: 'Trang chủ', href: '/' },
        { title: 'Giỏ hàng' },
    ];

    return (
        <>
            <div className="mt-5">
                <BreadcrumbSection items={breadcrumbItems} />
            </div>
            <div className="shopping-cart section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <CartTable cartItems={cartItems} updateCartItems={updateCartItems}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <TotalAmount cartItems={cartItems}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShoppingCart;
