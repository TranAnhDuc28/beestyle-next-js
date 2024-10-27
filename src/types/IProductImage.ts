export interface IProductImage {
    id: number,
    productId?: number,
    imagUrl?: string,
    isDefault?: boolean,
}

export interface IProductImageCreate {
    productId?: number,
    imagUrl?: string,
    isDefault?: boolean,
}