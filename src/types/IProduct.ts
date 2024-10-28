import {IProductImage} from "@/types/IProductImage";
import {IProductVariant} from "@/types/IProductVariant";

export interface IProduct {
    id: number;
    productName?: string;
    imageUrl?: string;
    categoryId?: number;
    categoryName?: string;
    gender?: string;
    brandId?: number;
    brandName?: string;
    materialId?: number;
    materialName?: string;
    description?: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}

export interface IProductCreate {
    productName: string;
    categoryId?: number;
    gender?: string;
    brandId?: number;
    materialId?: number;
    description?: string;
    status?: string;
    productImages?: IProductImage[];
    productVariants?: IProductVariant[];
    createdBy?: number;
    updatedBy?: number;
}