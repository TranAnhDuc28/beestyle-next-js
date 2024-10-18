import BrandComponent from "@/components/Admin/Brand/BrandComponent";
import Loader from "@/components/Loader/Loader";
import React, { Suspense } from "react";

const BrandPage = () => {

    return (
        <Suspense fallback={<Loader />}>
            <BrandComponent/>
        </Suspense>
    );
}

export default BrandPage;