import httpInstance from "@/utils/HttpInstance";
import {IPromotion} from "@/types/IPromotion";

export const URL_API_PROMOTION = {
    get: '/admin/promotion',
    create: '/admin/promotion/create',
    update: '/admin/promotion/update',
    delete: '/admin/promotion/delete',
    search: '/admin/promotion/search',
    searchByDate: '/admin/promotion/findbydate',
};

export const getPromotions = async (url: string) => {
    const response = await httpInstance.get(url);
    return response.data;
}

export const createPromotion = async (data: IPromotion) => {
    const response = await httpInstance.post(URL_API_PROMOTION.create, data);
    return response.data;
}

export const updatePromotion = async (data: IPromotion) => {
    const response = await httpInstance.put(`${URL_API_PROMOTION.update}/${data.id}`, data);
    return response.data;
}

export const deletePromotion = async (id: string) => {
    const response = await httpInstance.delete(`${URL_API_PROMOTION.delete}/${id}`);
    return response.data;
}

export const findPromotions = async (searchTerm, page = 0, size = 10) => {
    const response = await httpInstance.get(`${URL_API_PROMOTION.search}`, {
        params: {searchTerm, page, size},
    });
    return response.data;
};

export const findPromotionsByDate = async (startDate, endDate, page = 0, size = 10) => {
    const response = await httpInstance.get(`${URL_API_PROMOTION.searchByDate}`, {
        params: {startDate, endDate, page, size},
    });
    return response.data;
}
import axios from 'axios';


