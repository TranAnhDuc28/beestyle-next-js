import useSWR from "swr";
import React from "react";
import {getBrands, URL_API_BRAND} from "@/services/BrandService";
import {IBrand} from "@/types/IBrand";

const transformData = (data: IBrand[]) => {
    return data.map((item: IBrand) => ({
        key: item.id.toString() as React.Key,
        value: item.id,
        label: item.brandName,
        title: item.brandName,
    }));
};

const useOptionBrand = (isLoadOption: boolean) => {
    const {data, error, isLoading} = useSWR(
        isLoadOption ? `${URL_API_BRAND.get}?size=1000` : null,
        getBrands,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const dataOptionBrand = !isLoading && data?.data?.items ? transformData(data.data.items) : [];

    return {dataOptionBrand, error, isLoading};
}
export default useOptionBrand;