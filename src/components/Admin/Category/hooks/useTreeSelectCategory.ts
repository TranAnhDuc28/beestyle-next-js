import useSWR from "swr";
import {getCategoryOptions, URL_API_CATEGORY} from "@/services/CategoryService";
import React from "react";

const transformData = (data: any) => {
    return data.map((item: any) => ({
        key: item.id.toString() as React.Key,
        title: item.categoryName,
        value: item.id,
        children: transformData(item.categoryChildren),
    }));
};

const useTreeSelectCategory = (isLoadTree: boolean) => {
    let dataTreeSelectCategory: any = [];

    const {data, error, isLoading} = useSWR(
        isLoadTree ? URL_API_CATEGORY.options : null,
        getCategoryOptions,
        {
            revalidateIfStale:false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
    );

    if (!isLoading && data) {
        dataTreeSelectCategory = data?.data ? transformData(data?.data) : [];
    }

    return {dataTreeSelectCategory, error, isLoading};
}

export default useTreeSelectCategory;