// export const DISCOUNT_TYPE = {
//     PERCENTAGE: "Phần trăm(%)",
//     CASH: "Tiền mặt"
// } as const;
export const DISCOUNT_TYPE = {
    PERCENTAGE: {
        id: 0,
        key: "PERCENTAGE",
        description: "Phần trăm(%)"
    },
    CASH: {
        id: 1,
        key: "CASH",
        description: "Tiền mặt"
    },
} as const;