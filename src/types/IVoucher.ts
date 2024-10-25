export interface IVoucher {
    id: number;
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
}