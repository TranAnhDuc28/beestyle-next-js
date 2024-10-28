import httpInstance from "@/utils/HttpInstance";
import {IProduct, IProductCreate} from "@/types/IProduct";
import {IProductVariant} from "../types/IProductVariant";

export const URL_API_PRODUCT = {
    options: '/admin/product',
    get: '/admin/product',
    create: '/admin/product/create',
    update: '/admin/product/update',
    delete: '/admin/product/delete',
    productVariant: '/admin/product/productVariant'
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
export const getProductDetails = async (data: IProductVariant) => {
    try {
        const response = await httpInstance.get(URL_API_PRODUCT.productVariant);
        console.log(`All product details:`, response.data); // In ra thông tin chi tiết của tất cả sản phẩm
        return response.data; // Giả sử API trả về data là thông tin chi tiết của tất cả sản phẩm
    } catch (error) {
        console.error(`Error fetching product details:`, error); // Nên ghi rõ khi có lỗi
        throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
    }
};



