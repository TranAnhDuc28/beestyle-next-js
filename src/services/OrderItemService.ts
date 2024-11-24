import httpInstance from "@/utils/HttpInstance";
import {IUpdateOrderItem, ICreateOrderItem} from "@/types/IOrderItem";

export const URL_API_ORDER_ITEM = {
    get: (orderId: string) => `/admin/order/${orderId}/order-items`,
    create: `/admin/order-item/create`,
    update: (orderItemId: string) => `/admin/order-item/${orderItemId}`,
    patchQuantity: `/admin/order-item/update-quantity`,
    delete: (orderItemId: string) => `/admin/order-item/delete/${orderItemId}`,
};

export const getOrderItemsByOrderId = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
}

export const createOrderItem = async (data: ICreateOrderItem) => {
    const response = await httpInstance.post(URL_API_ORDER_ITEM.create, data);
    return response.data;
}

export const updateOrderItem = async (data: IUpdateOrderItem) => {
    const response = await httpInstance.put(URL_API_ORDER_ITEM.update(data.id.toString()), data);
    return response.data;
}

export const updateQuantityOrderItem = async (data: IUpdateOrderItem) => {
    const response = await httpInstance.patch(URL_API_ORDER_ITEM.patchQuantity, data);
    return response.data;
}

export const deleteOrderItem = async (id: number) => {
    const response = await httpInstance.delete(URL_API_ORDER_ITEM.delete(id.toString()));
    return response.data;
}
