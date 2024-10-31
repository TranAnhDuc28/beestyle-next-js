export const STATUS_PRODUCT = {
    ACTIVE: "Đang kinh doanh",
    INACTIVE: "Ngừng kinh doanh",
} as const;


export type StatusProductKeys = keyof typeof STATUS_PRODUCT;
