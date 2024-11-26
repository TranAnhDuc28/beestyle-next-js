import httpInstance from "@/utils/HttpInstance";
import useSWR from 'swr';

interface ProductVariantDetail {
    productId: string;
    productName: string;
    productCode: string;
    price: number;
    originalPrice: number;
    sku: string;
    colorName: string | null;
    colorCode: string | null;
    sizeName: string | null;
    quantityInStock: number;
    description: string;
}

interface ProductImage {
    id: string;
    url: string;
    isDefault?: boolean;
    productId: string;
}

interface ProductColor {
    id: string;
    name: string;
    code: string;
}

interface ProductSize {
    id: string;
    name: string;
}

interface CacheItem<T> {
    data: T;
    timestamp: number;
}

interface ApiResponse<T> {
    data: T;
    message?: string;
    status?: number;
}

export type {
    ProductVariantDetail,
    ProductImage,
    ProductColor,
    ProductSize,
    ApiResponse
};

const CACHE_DURATION = 1000 * 60 * 30;

const CACHE_KEYS = {
    PRODUCT: (id: string, color?: string, size?: string) =>
        `product_${id}_${color || 'default'}_${size || 'default'}`,
    IMAGES: (id: string) => `product_images_${id}`,
    COLORS: (id: string) => `product_colors_${id}`,
    SIZES: (id: string) => `product_sizes_${id}`,
};

const setCache = <T>(key: string, data: T): void => {
    const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
};

const getCache = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const cacheItem: CacheItem<T> = JSON.parse(item);
    const isExpired = Date.now() - cacheItem.timestamp > CACHE_DURATION;

    if (isExpired) {
        localStorage.removeItem(key);
        return null;
    }

    return cacheItem.data;
};

export const URL_API_PRODUCT_IMAGE = (productId: any): string => {
    return `/product/${productId}/variant/image`;
};

export const URL_API_PRODUCT_COLOR = (productId: any): string => {
    return `/product/${productId}/variant/color`;
};

export const URL_API_PRODUCT_SIZE = (productId: any): string => {
    return `/product/${productId}/variant/size`;
};

export const handleFetchProduct = (productId: any, color?: string, size?: string): string => {
    let url = `/product/${productId}/variant`;

    if (color || size) {
        const params: Record<string, string> = {};
        if (color) params.c = color;
        if (size) params.s = size;
        const query = new URLSearchParams(params).toString();
        url += `?${query}`;
    }

    return url;
};

export const getProduct = async (
    productId: string,
    color?: string,
    size?: string
): Promise<ProductVariantDetail> => {
    const cacheKey = CACHE_KEYS.PRODUCT(productId, color, size);
    const cachedData = getCache<ProductVariantDetail>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const url = handleFetchProduct(productId, color, size);
    const response = await httpInstance.get<ApiResponse<ProductVariantDetail>>(url);
    const data = response.data.data;

    setCache(cacheKey, data);
    return data;
};

export const getImageSingleProduct = async (productId: any): Promise<ProductImage[]> => {
    const cacheKey = CACHE_KEYS.IMAGES(productId);
    const cachedData = getCache<ProductImage[]>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const url = URL_API_PRODUCT_IMAGE(productId);
    const response = await httpInstance.get<ApiResponse<ProductImage[]>>(url);
    const data = response.data.data;

    setCache(cacheKey, data);
    return data;
};

export const getColorSingleProduct = async (productId: any): Promise<ProductColor[]> => {
    const cacheKey = CACHE_KEYS.COLORS(productId);
    const cachedData = getCache<ProductColor[]>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const url = URL_API_PRODUCT_COLOR(productId);
    const response = await httpInstance.get<ApiResponse<ProductColor[]>>(url);
    const data = response.data.data;

    setCache(cacheKey, data);
    return data;
};

export const getSizeSingleProduct = async (productId: any): Promise<ProductSize[]> => {
    const cacheKey = CACHE_KEYS.SIZES(productId);
    const cachedData = getCache<ProductSize[]>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const url = URL_API_PRODUCT_SIZE(productId);
    const response = await httpInstance.get<ApiResponse<ProductSize[]>>(url);
    const data = response.data.data;

    setCache(cacheKey, data);
    return data;
};

export const useProduct = (productId: any, color?: any, size?: any) => {
    return useSWR(
        productId ? [productId, color, size] : null,
        () => getProduct(productId, color, size),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: CACHE_DURATION,
        }
    );
};

export const useProductImages = (productId: any) => {
    return useSWR(
        productId ? URL_API_PRODUCT_IMAGE(productId) : null,
        () => getImageSingleProduct(productId),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: CACHE_DURATION,
        }
    );
};

export const useProductColors = (productId: any) => {
    return useSWR(
        productId ? URL_API_PRODUCT_COLOR(productId) : null,
        () => getColorSingleProduct(productId),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: CACHE_DURATION,
        }
    );
};

export const useProductSizes = (productId: any) => {
    return useSWR(
        productId ? URL_API_PRODUCT_SIZE(productId) : null,
        () => getSizeSingleProduct(productId),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: CACHE_DURATION,
        }
    );
};