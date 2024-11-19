import httpInstance from "@/utils/HttpInstance";

export const URL_API_ORDER_ITEM = {
    get: (orderId: number) => `/admin/order/${orderId}/order-items`,
    create: (orderId: number) => `/admin/order/${orderId}/order-item/create`,
    update: (orderId: number) => `/admin/order/${orderId}/order-item/update`,
    delete: (orderId: number, orderItemId: number) => `/admin/order/${orderId}/order-item/delete/${orderItemId}`,
};

export const getOrderItemsByOrderId = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
}

export const createOrderItemByOrderId = async (url: string) => {
    const response = await httpInstance.post(url);
    return response.data;
}

export const updateOrderItemByOrderId = async (url: string) => {
    const response = await httpInstance.put(url);
    return response.data;
}

export const deleteOrderItemByOrderId = async (url: string) => {
    const response = await httpInstance.delete(url);
    return response.data;
}
