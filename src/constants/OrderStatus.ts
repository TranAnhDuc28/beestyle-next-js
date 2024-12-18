export const ORDER_STATUS = {
    PENDING: {
        id: 0,
        name: "Chờ thanh toán"
    },
    PAID: {
        id: 1,
        name: "Đã thanh toán",
    },
    AWAITING_CONFIRMATION: {
        id: 2,
        name: "Chờ xác nhận",
    },
    CONFIRMED: {
        id: 3,
        name: "Đã xác nhận",
    },
    AWAITING_SHIPMENT: {
        id: 4,
        name: "Chờ giao hàng",
    },
    OUT_FOR_DELIVERY: {
        id: 5,
        name: "Đang giao hàng",
    },
    DELIVERED: {
        id: 6,
        name: "Đã giao hàng",
    },
    CANCELLED: {
        id: 7,
        name: "Đã hủy",
    },
    // RETURN_REQUESTED: "Yêu cầu trả hàng",
    // RETURNED: "Đã trả hàng",
    // REFUNDED: "Đã hoàn tiền"
} as const;

export const ORDER_STATUS_COLOR: Map<keyof typeof ORDER_STATUS, string> =
    new Map<keyof typeof ORDER_STATUS, string>([
        ['PENDING', 'orange'],
        ['PAID', 'green'],
        ['AWAITING_CONFIRMATION', 'blue'],
        ['CONFIRMED', 'geekblue'],
        ['AWAITING_SHIPMENT', 'purple'],
        ['OUT_FOR_DELIVERY', 'processing'],
        ['DELIVERED', 'success'],
        ['CANCELLED', 'red'],
        // ['RETURN_REQUESTED', 'gold'],
        // ['RETURNED', 'volcano'],
        // ['REFUNDED', 'cyan']
    ]);
