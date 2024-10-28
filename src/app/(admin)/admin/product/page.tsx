import {Suspense} from "react";
import Loader from "@/components/Loader/Loader";
import ProductComponent from "@/components/Admin/Product/ProductComponent";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Sản phẩm",
    description: "Product service",
};


const Product = () => {
    return (
        <Suspense fallback={<Loader />}>
            <ProductComponent/>
        </Suspense>
    );
}

export default Product;