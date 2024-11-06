export const DISCOUNT_STATUS = {
    UPCOMING: "Sắp diễn ra",
    ONGOING: "Đang diễn ra",
    ENDED: "Đã kết thúc"

} as const;

export type DiscountStatusKeys = keyof typeof DISCOUNT_STATUS;
