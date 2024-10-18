import useSWR from "swr";
import {getCategoryOptions, URL_API_CATEGORY} from "@/services/CategoryService";

const transformData = (data: any) => {
    return data.map((item: any) => ({
        title: item.categoryName,
        value: item.id,
        key: item.id.toString(),
        children: transformData(item.categoryChildren),
    }));
};

const useTreeSelectCategory = (isModalOpen: boolean) => {
    const {data, error, isLoading} = useSWR(
        URL_API_CATEGORY.options,
        getCategoryOptions,
        {
            revalidateIfStale:false,
            revalidateOnReconnect: false,
            refreshInterval: 1200000,
            shouldRetryOnError: false,
        }
    );

    let dataTreeSelectCategory: any = [];
    if (!isLoading && data) {
        dataTreeSelectCategory = data?.data ? transformData(data?.data) : [];
    }

    return {dataTreeSelectCategory, error, isLoading};
}

export default useTreeSelectCategory;