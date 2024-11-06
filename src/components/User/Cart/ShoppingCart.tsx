import React from 'react';
import CartTable from "@/components/User/Cart/CartTable";
import TotalAmount from "@/components/User/Cart/TotalAmount";

const ShoppingCart = () => {
    return (
        <div className="shopping-cart section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <CartTable/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TotalAmount/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
