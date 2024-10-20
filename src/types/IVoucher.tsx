export interface Voucher {
    key: string;
    voucherCode: string;
    voucherName: string;
    discountType: string;
    discountValue: number;
    maxDiscount: number;
    minOrderValue: number;
    startDate: string;
    endDate: string;
    usageLimit: number;
    usagePerUser: number;
    status: number;
}I