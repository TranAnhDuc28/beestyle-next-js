import {Suspense} from "react";
import Loader from "@/components/Loader/AdminLoader";
import ProductComponent from "@/components/Admin/Product/ProductComponent";
import {Metadata} from "next";
import AdminLoader from "@/components/Loader/AdminLoader";

export const metadata: Metadata = {
    title: "Sản phẩm",
    description: "Product service",
};


const Product = () => {
    return (
        <Suspense fallback={<AdminLoader />}>
            <ProductComponent/>
        </Suspense>
    );
}

export default Product;