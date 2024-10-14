import httpInstance, {OptionsParams} from "@/utils/HttpInstance";

export const materialUrlEndpoint = "/material";

export const getMaterials = async (options: OptionsParams = {}) => {
    const response = await httpInstance.get("admin" + materialUrlEndpoint, options);
    return response.data;
}
