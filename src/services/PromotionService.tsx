import httpInstance, {OptionsParams} from "@/utils/HttpInstance";

export const PromotionUrlEndpoint = "/promotion";

export const getPromotions = async (options: OptionsParams = {}) => {
    const response = await httpInstance.get("admin" + PromotionUrlEndpoint, options);
    return response.data;
}
