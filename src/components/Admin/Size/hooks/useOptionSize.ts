import useSWR from "swr";
import React from "react";
import {getColors} from "@/services/ColorService";
import {URL_API_SIZE} from "@/services/SizeService";
import {ISize} from "@/types/ISize";

const transformData = (data: ISize[]) => {
    return data.map((item: any) => ({
        key: item.id.toString() as React.Key,
        value: item.id,
        label: item.brandName,
        title: item.brandName,
    }));
};

const useOptionSize = (isLoadOption: boolean) => {
    const {data, error, isLoading} = useSWR(
        isLoadOption ? `${URL_API_SIZE.get}?size=100` : null,
        getColors,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const dataOptionSize = !isLoading && data?.data?.items ? transformData(data.data.items) : [];

    return {dataOptionSize, error, isLoading};
}
export default useOptionSize;