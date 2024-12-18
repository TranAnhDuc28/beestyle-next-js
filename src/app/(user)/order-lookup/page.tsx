import { Metadata } from "next";
import UserLoader from "@/components/Loader/UserLoader";
import { Suspense } from "react";
import OrderLookup from "@/components/User/OrderLookup/OrderLookup";

export const metadata: Metadata = {
    title: "Tra cứu đơn hàng",
    description: "order-lookup",
};

export default function OrderLookupPage() {
    return (
        <Suspense fallback={<UserLoader />}>
            <OrderLookup />
        </Suspense>
    );
};
