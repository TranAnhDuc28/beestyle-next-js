export const ORDER_STATUS = {
    PENDING: "Chờ thanh toán",
    PAID: "Đã thanh toán",
    AWAITING_CONFIRMATION: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    OUT_FOR_DELIVERY: "Đang giao hàng",
    DELIVERED: "Đã giao hàng",
    CANCELLED: "Đã hủy",
    RETURN_REQUESTED: "Yêu cầu trả hàng",
    RETURNED: "Đã trả hàng",
    REFUNDED: "Đã hoàn tiền"
} as const;

export const ORDER_STATUS_COLOR = {
    PENDING: "orange",
    PAID: "green",
    AWAITING_CONFIRMATION: "blue",
    CONFIRMED: "geekblue",
    OUT_FOR_DELIVERY: "processing",
    DELIVERED: "success",
    CANCELLED: "red",
    RETURN_REQUESTED: "gold",
    RETURNED: "volcano",
    REFUNDED: "cyan",
};