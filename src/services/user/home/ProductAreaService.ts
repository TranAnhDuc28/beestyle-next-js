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

export const getProductForUser = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data.data.content;
}

export const getSellingProduct = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data.data.content;
}

export const getOfferingProduct = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data.data.content;
}

export const findProduct = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data.data;
}