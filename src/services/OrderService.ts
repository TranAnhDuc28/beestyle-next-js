import httpInstance from "@/utils/HttpInstance";
import {IOrder, IOrderCreateOrUpdate} from "@/types/IOrder";

export const URL_API_ORDER = {
    getOrderPending: '/admin/order/order-pending',
    filter: '/admin/order',
    create: '/admin/order/create',
    update: (id: number) => `/admin/order/update/${id}`,
};

export const getOrders = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
}

export const createOrder = async (data: IOrderCreateOrUpdate) => {
    const response = await httpInstance.post(URL_API_ORDER.create, data);
    return response.data;
}

export const updateOrder = async (data: IOrder, id: number) => {
    const response = await httpInstance.post(URL_API_ORDER.update(id), data);
    return response.data;
}
