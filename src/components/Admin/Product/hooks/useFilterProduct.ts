import useSWR from "swr";
import {getProducts, URL_API_PRODUCT} from "@/services/ProductService";

export interface ParamFilterProduct {
    page?: number;
    size?: number;
    category?: string;
    gender?: string;
    brand?: string;
    material?: string;
    minPrice?: number;
    maxPrice?: number;
}

const useFilterProduct = (param?: ParamFilterProduct) => {
    const paramString = new URLSearchParams();

    if (param) {
        Object.keys(param).forEach((key) => {
            const value = param[key as keyof ParamFilterProduct];
            if (value !== undefined && value !== null) {
                paramString.append(key, value.toString());
            }
        });
    }

    const {data, error, isLoading, mutate: mutateProduct} =
        useSWR(`${URL_API_PRODUCT.filter}?${paramString.toString()}`,
            getProducts,
            {
                revalidateIfStale: false,
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
            }
        );

    const dataOptionFilterProduct = !isLoading && data?.data ? data.data : [];
    return {dataOptionFilterProduct, error, isLoading, mutateProduct};
}
export default useFilterProduct;