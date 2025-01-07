import httpInstance from "@/utils/HttpInstance";
import {IOrder, IOrderCreateOrUpdate} from "@/types/IOrder";

export const URL_API_ORDER = {
    getOrderPending: '/admin/order/order-pending',
    getOrderDetail: (id: number) => `/admin/order/${id}`,
    filter: '/admin/order',
    create: '/admin/order/create',
    createOrderOnline: '/admin/order/create-order-online',
    update: (id: number) => `/admin/order/update/${id}`,
    updateOrderStatus: (id: number) => `/admin/order/${id}/update-status`
};

export const getOrders = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
}

export const createOrder = async (data: IOrderCreateOrUpdate) => {
    const response = await httpInstance.post(URL_API_ORDER.create, data);
    return response.data;
}

export const createOrderOnline = async (data: IOrderCreateOrUpdate) => {
    const response = await httpInstance.post(URL_API_ORDER.createOrderOnline, data);
    return response.data;
}

export const updateOrder = async (data: IOrderCreateOrUpdate, id: number) => {
    const response = await httpInstance.post(URL_API_ORDER.update(id), data);
    return response.data;
}

export const updateOrderStatus = async (id: number) => {
    const response = await httpInstance.patch(URL_API_ORDER.updateOrderStatus(id));
    return response.data;
}


