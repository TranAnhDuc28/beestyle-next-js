import httpInstance from "@/utils/HttpInstance";

export const URL_API_PRODUCT_VARIANT = {
    create: '/admin/product-variant/creates',
    update: '/admin/product-variant/update',
};

export const getProductVariantsByProductId = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
}
