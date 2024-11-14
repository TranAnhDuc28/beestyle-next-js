import httpInstance from "@/utils/HttpInstance";
import {URL_API_PRODUCT} from "./ProductService";

export const URL_API_PRODUCT_VARIANT = {
    create: '/admin/product-variant/creates',
    update: '/admin/product-variant/update',
    productVariant: '/admin/productVariant',
    updateProductVariant: '/admin/productVariant/updates',
    updateProductVariantUpdate: '/admin/productVariant/updatess',
    removePromotionFromNonSelectedVariants: '/admin/{promotionId}/delete',
};

export const getProductVariantsByProductId = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
}
export const getProductDetails = async (productId: number) => {
    try {
        const response = await httpInstance.get(`${URL_API_PRODUCT_VARIANT.productVariant}?productIds=${productId}`);
        console.log("Product details:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        throw error;
    }
};
export const updateProductVariant = async (promotionId: number, variantIds: number[]) => {
    try {
        const response = await httpInstance.put(URL_API_PRODUCT_VARIANT.updateProductVariant, {
            promotionId,
            variantIds,
            status: "ACTIVE",
        });
        return response.data;
    } catch (error) {
        console.error("Error updating product variant:", error);
        throw error;
    }
};
export const updateProductVariantUpdate = async (promotionId: number, variantIds: number[]) => {
    try {
        const response = await httpInstance.put(URL_API_PRODUCT_VARIANT.updateProductVariantUpdate, {
            promotionId,
            variantIds,
            status: "ACTIVE",
        });
        console.log("API Response for Update:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating product variant:", error);
        throw error;
    }
};
export const removePromotionFromNonSelectedVariants = async (promotionId, ids) => {
    try {
        const response = await httpInstance.put(
            URL_API_PRODUCT_VARIANT.removePromotionFromNonSelectedVariants.replace("{promotionId}", promotionId),
            ids
        );
        console.log("Promotion removed successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error removing promotion:", error);
        throw error;
    }
};
