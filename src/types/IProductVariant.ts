export interface IProductVariant {
    id: number;
    sku?: string;
    productVariantName?: string;
    productId?: number;
    colorId?: number;
    colorName?: string;
    sizeId?: number;
    sizeName?: string;
    originalPrice?: number;
    salePrice?: number;
    quantityInStock?: number;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}

export interface IProductVariantCreate{
    key: string
    sku?: string;
    productVariantName?: string;
    productId?: number;
    colorId?: number;
    sizeId?: number;
    originalPrice?: number;
    salePrice?: number;
    quantityInStock?: number;
}