import {Suspense} from "react";
import Loader from "@/components/Loader/Loader";
import ProductComponent from "@/components/Admin/Product/ProductComponent";
import {Metadata} from "next";
import CreateProduct from "@/components/Admin/Product/CreateProduct";

export const metadata: Metadata = {
    title: "Sản phẩm",
    description: "Create New Product",
};


const Product = () => {
    return (
        <Suspense fallback={<Loader />}>
            <CreateProduct/>
        </Suspense>
    );
}

export default Product;