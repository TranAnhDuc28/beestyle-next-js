import React from 'react';
import ShoppingCart from "@/components/User/Cart/ShoppingCart";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Giỏ hàng",
    description: "cart"
};

const CartPage = () => {
    return (
        <div>
            <ShoppingCart/>
        </div>
    );
};

export default CartPage;
