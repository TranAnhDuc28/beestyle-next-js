import React, {Suspense} from "react";
import Loader from "@/components/Loader/UserLoader";
import {Metadata} from "next";
import OrderComponent from "@/components/Admin/Order/OrderComponent";

export const metadata: Metadata = {
    title: "Hoá đơn",
    description: "Order - Order service",
};
const OrderPage: React.FC = () => {
    return (
        <div>
            <Suspense fallback={<Loader/>}>
                <OrderComponent/>
            </Suspense>
        </div>
    );
};

export default OrderPage;
