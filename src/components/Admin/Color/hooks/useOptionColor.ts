import useSWR from "swr";
import React from "react";
import {getColors, URL_API_COLOR} from "@/services/ColorService";
import {IColor} from "@/types/IColor";

const transformData = (data: IColor[]) => {
    return data.map((item: any) => ({
        key: item.id.toString() as React.Key,
        value: item.id,
        label: item.brandName,
        title: item.brandName,
    }));
};

const useOptionColor = (isLoadOption: boolean) => {
    const {data, error, isLoading} = useSWR(
        isLoadOption ? URL_API_COLOR.get : null,
        getColors,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const dataOptionColor = !isLoading && data?.data?.items ? transformData(data.data.items) : [];

    return {dataOptionColor, error, isLoading};
}
export default useOptionColor;