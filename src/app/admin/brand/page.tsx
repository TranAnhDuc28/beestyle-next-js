import BrandComponent from "@/components/Admin/Brand/BrandComponent";
import Loader from "@/components/Loader/Loader";
import { OptionsParams } from "@/utils/HttpInstance";
import React, { Suspense } from "react";

const BrandPage = (props: any) => {
    const size: number = (props?.searchParams?.size && !isNaN(props.searchParams.size)) ?
        Number(props.searchParams.size) : 10;
    const page: number = (props?.searchParams?.page && !isNaN(props.searchParams.page)) ?
        Number(props.searchParams.page) : 1;

    const options: OptionsParams = {
        params: {
            page: page,
            size: size
        }
    };

    return (
        <Suspense fallback={<Loader />}>
            <BrandComponent options={options} />
        </Suspense>
    );
}

export default BrandPage;