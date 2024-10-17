import httpInstance, {OptionsParams} from "@/utils/HttpInstance";

export const URL_API_BRAND = {
    get: '/admin/brand',
    create: '/admin/brand/create',
    update: '/admin/brand/update',
    delete: '/admin/brand/delete',
};

export const getBrands = async (options: OptionsParams = {}) => {
    const response = await httpInstance.get(URL_API_BRAND.get, options);
    return response.data;
}
