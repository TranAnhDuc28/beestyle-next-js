import { IMaterial } from "@/types/IMaterial";
import httpInstance, {OptionsParams} from "@/utils/HttpInstance";

const delay = () => new Promise<void>(res => setTimeout(() => res(), 1000));

export const materialUrlEndpoint = "material";

export const getMaterials = async (options: OptionsParams = {}) => {
    const response = await httpInstance.get(`admin/${materialUrlEndpoint}`, options);
    return response.data;
}

export const createMaterial = async (value: IMaterial) => {
    const response = await httpInstance.post(`admin/${materialUrlEndpoint}/create`, value);
    return response.data;
}
