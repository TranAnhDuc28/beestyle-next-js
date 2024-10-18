// const API_URL = process.env.NEXT_PUBLIC_API_URL
//
// export const getVoucher = async () => {
//     try {
//         const response = await fetch(`${API_URL}/admin/voucher`)
//
//         const result = await response.json()
//         const {data: {items} } = result
//         return items
//     } catch (error) {
//         throw new Error('Fetch data failed');
//     }
// }
import httpInstance, {OptionsParams} from "@/utils/HttpInstance";
import {materialUrlEndpoint} from "./MaterialService";

export const vuocherUrlEndpoint = "/voucher";
export const getVoucher = async (options: OptionsParams = {}) => {
    try {
        const response = await httpInstance.get("admin" + vuocherUrlEndpoint + "/vouchers", options);
        console.log("Response from API:", response.data); // Kiểm tra dữ liệu từ API
        return response.data;
    } catch (error) {
        console.error("Error fetching vouchers:", error.response || error.message);
        throw error;
    }
};
export const createVoucher = async (data: IMaterial) => {
    const response = await httpInstance.post(`admin/${materialUrlEndpoint}/create`, data);
    return response.data;
}

export const updateVoucher = async (data: IMaterial) => {
    const response = await httpInstance.put(`admin/${materialUrlEndpoint}/update/${data.id}`, data);
    return response.data;
}
