import BrandComponent from "@/components/Admin/Brand/BrandComponent";
import Loader from "@/components/Loader/Loader";
import React, { Suspense } from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Thương hiệu",
    description: "Product - Brand service",
};

function BrandPage() {
    return (
        <Suspense fallback={<Loader />}>
            <BrandComponent/>
        </Suspense>
    );
}
export default BrandPage;