import httpInstance from "@/utils/HttpInstance";
import {IProduct, IProductCreate} from "@/types/IProduct";

export const URL_API_PRODUCT = {
    options: '/admin/product',
    get: '/admin/product',
    create: '/admin/product/create',
    update: '/admin/product/update',
    delete: '/admin/product/delete',
};

export const getProducts = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
}

export const createProduct = async (data: IProductCreate) => {
    const response = await httpInstance.post(URL_API_PRODUCT.create, data);
    return response.data;
}

export const updateProduct = async (data: IProduct) => {
    const response = await httpInstance.put(`${URL_API_PRODUCT.update}/${data.id}`, data);
    return response.data;
}




