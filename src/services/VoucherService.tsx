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
import {IVoucher} from "@/types/IVoucher";

export const URL_API_VOUCHER = {
    get: '/admin/voucher/vouchers',
    create: '/admin/voucher/create',
    update: '/admin/voucher/update',
    delete: '/admin/voucher/delete',
};

export const getVouchers = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
}

export const createVoucher = async (data: IVoucher) => {
    const response = await httpInstance.post(URL_API_VOUCHER.create, data);
    return response.data;
}

export const updateVoucher = async (data: IVoucher) => {
    const response = await httpInstance.put(`${URL_API_VOUCHER.update}/${data.key}`, data);
    return response.data;
}

export const deleteVoucher = async (id: string) => {
    const response = await httpInstance.delete(`${URL_API_VOUCHER.delete}/${id}`);
    return response.data;
}