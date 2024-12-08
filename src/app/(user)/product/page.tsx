import UserProductComponent from "@/components/User/ShopGrid/UserProductComponent";
import {Metadata} from "next";
import UserLoader from "@/components/Loader/UserLoader";
import {Suspense} from "react";

export const metadata: Metadata = {
    title: "Sản phẩm",
    description: "product",
};

export default function Category() {
    return (
        <Suspense fallback={<UserLoader/>}>
            <UserProductComponent/>
        </Suspense>
    );
};
