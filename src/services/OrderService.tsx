import httpInstance from "@/utils/HttpInstance";

export const URL_API_ORDER = {
    options: '/order',
    get: '/admin/order',
    create: '',
};

export const getOrdersById = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
}

export const getOrderAndOptions = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
}