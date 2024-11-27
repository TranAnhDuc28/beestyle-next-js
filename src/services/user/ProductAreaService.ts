import httpInstance from "@/utils/HttpInstance";
import React from "react";
import {mutate} from "swr";

export const URL_API_PRODUCT_AREA = 'product';

export const URL_API_PRODUCT_SELLER = 'product/seller';

export const URL_API_PRODUCT_OFFER = 'product/offer';

export const URL_API_PRODUCT_SEARCH = 'product/search';

export const handleFetch = async (param: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await mutate(URL_API_PRODUCT_AREA, async () => {
            const response = await httpInstance.get(param);
            return response.data.data.content;
        },
        {revalidate: false}
    )
};

const fetchWithCache = async (url: string, cacheKey: string, cacheDuration: number = 900000) => {
    const now = Date.now();
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

    if (cachedData && cachedTimestamp && now - parseInt(cachedTimestamp) < cacheDuration) {
        return JSON.parse(cachedData);
    }

    const response = await httpInstance.get(url);
    const data = response.data.data.content;

    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(`${cacheKey}_timestamp`, now.toString());

    return data;
};

export const getProductForUser = (url: string) => fetchWithCache(url, "getProductForUser");
export const getSellingProduct = (url: string) => fetchWithCache(url, "getSellingProduct");
export const getOfferingProduct = (url: string) => fetchWithCache(url, "getOfferingProduct");
export const findProduct = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
};
