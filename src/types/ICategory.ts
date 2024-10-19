export interface ICategory{
    id: number;
    categoryName: string;
    slug?: string;
    level?: number;
    priority?: number;
    parentCategoryId?: number;
    parentCategoryName?: string;
    status?: string;
    createAt?: string;
    updateAt?: string;
}