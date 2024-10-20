import httpInstance, {OptionsParams} from "@/utils/HttpInstance";

export const URL_API_PROMOTION = {
    get: '/admin/promotion',
    create: '/admin/promotion/create',
    update: '/admin/promotion/update',
    delete: '/admin/promotion/delete',
};

export const getPromotions = async (url:string) => {
    const response = await httpInstance.get(url);
    return response.data;
}