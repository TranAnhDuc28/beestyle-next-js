import Product from "@/components/User/ShopGrid/Product";
import {Metadata} from "next";
import UserLoader from "@/components/Loader/UserLoader";
import {Suspense} from "react";

export const metadata: Metadata = {
    title: "Danh mục",
    description: "category",
};

export default function Category() {
    return (
        <Suspense fallback={<UserLoader/>}>
            <Product/>
        </Suspense>
    );
};
