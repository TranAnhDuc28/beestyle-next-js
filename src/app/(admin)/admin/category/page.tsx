import React, {Suspense} from "react";
import Loader from "@/components/Loader/Loader";
import {Metadata} from "next";
import CategoryComponent from "@/components/Admin/Category/CategoryComponent";

export const metadata: Metadata = {
    title: "Danh mục sản phẩm",
    description: "Product - Category service",
};

function Category() {
    return (
        <Suspense fallback={<Loader/>}>
            <CategoryComponent/>
        </Suspense>
    );
}

export default Category;