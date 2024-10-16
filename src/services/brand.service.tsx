import httpInstance, {OptionsParams} from "@/utils/HttpInstance";

export const brandUrlEndpoint = "/brand";

export const getBrands = async (options: OptionsParams = {}) => {
    const response = await httpInstance.get("admin" + brandUrlEndpoint, options);
    return response.data;
}
