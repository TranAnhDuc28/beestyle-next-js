import httpInstance from "@/utils/HttpInstance";

export const URL_API_STATISTICAL = {
    getRevenue: '/admin/statistics/revenue-by-period',
    getOrderStatus:'/admin/statistics/orderStatus-by-period'
}

export const getRevenues = async (url : string) => {
    const response = await httpInstance.get(url);
    return response.data;
}
export const getOrderStatus = async (url : string) => {
    const response = await httpInstance.get(url);
    return response.data;
}
