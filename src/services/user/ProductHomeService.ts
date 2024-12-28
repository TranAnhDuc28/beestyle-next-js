import httpInstance from "@/utils/HttpInstance";
import useSWR, { mutate } from "swr";

export const URL_API_PRODUCT_AREA = 'product';
export const URL_API_PRODUCT_SELLER = 'product/seller';
export const URL_API_PRODUCT_OFFER = 'product/offer';
export const URL_API_PRODUCT_SEARCH = 'product/search';

const fetcher = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data.data.content;
};

const configSwr = {
    refreshInterval: 15 * 60 * 1000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
}

export const handleFetch = async (param: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await mutate(URL_API_PRODUCT_AREA, fetcher(param));
};

export const findProduct = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
};

export const useProducts = () => {
    const { data: products, error, isLoading } = useSWR(
        URL_API_PRODUCT_AREA,
        fetcher,
        { ...configSwr }
    );
    return { products, error, isLoading };
};

export const useSellingProducts = () => {
    const { data: products, error, isLoading } = useSWR(
        URL_API_PRODUCT_SELLER,
        fetcher,
        { ...configSwr }
    );
    return { products, error, isLoading };
};

export const useOfferingProducts = () => {
    const { data: products, error, isLoading } = useSWR(
        URL_API_PRODUCT_OFFER,
        fetcher,
        { ...configSwr }
    );
    return { products, error, isLoading };
};
