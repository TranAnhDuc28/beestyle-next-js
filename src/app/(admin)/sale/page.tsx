import {Suspense} from "react";
import AdminLoader from "@/components/Loader/AdminLoader";
import ProductComponent from "@/components/Admin/Product/ProductComponent";
import {Metadata} from "next";
import SaleComponent from "@/components/Admin/Sale/SaleComponent";

export const metadata: Metadata = {
    title: "Bán hàng",
    description: "Point of sale",
};

const PointOfSale = () => {
    return (
        <Suspense fallback={<AdminLoader />}>
            <SaleComponent/>
        </Suspense>
    );
}

export default PointOfSale;