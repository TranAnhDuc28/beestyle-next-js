import {IMaterial} from "@/types/IMaterial";
import React from "react";
import useSWR from "swr";
import {getMaterials, URL_API_MATERIAL} from "@/services/MaterialService";

const transformData = (data: IMaterial[]) => {
    return data.map((item) => ({
        key: item.id.toString() as React.Key,
        value: item.id,
        label: item.materialName,
        title: item.materialName,
    }));
};

const useOptionMaterial = (isLoadOption: boolean) => {
    const {data, error, isLoading} = useSWR(
        isLoadOption ? `${URL_API_MATERIAL.option}` : null,
        getMaterials,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const dataOptionMaterial = !isLoading && data?.data ? transformData(data.data) : [];

    return {dataOptionMaterial, error, isLoading};
}
export default useOptionMaterial;