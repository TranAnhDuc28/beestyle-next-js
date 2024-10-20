
import httpInstance, {OptionsParams} from "@/utils/HttpInstance";
import {IVoucher} from "@/types/IVoucher";

export const URL_API_VOUCHER = {
    get: '/admin/voucher/vouchers',
    create: '/admin/voucher/create',
    update: '/admin/voucher/update',
    delete: '/admin/voucher/delete',
    search: '/admin/voucher/search',
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
    const response = await httpInstance.put(`${URL_API_VOUCHER.update}/${data.id}`, data);
    return response.data;
}

export const deleteVoucher = async (id: string) => {
    const response = await httpInstance.delete(`${URL_API_VOUCHER.delete}/${id}`);
    return response.data;
}
export const findVouchers = async (searchTerm, page = 0, size = 10) => {
    const response = await httpInstance.get(`${URL_API_VOUCHER.search}`, {
        params: { searchTerm, page, size },
    });
    return response.data;
};
