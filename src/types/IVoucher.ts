export interface IVoucher {
    id: number;
    voucherCode: string;
    voucherName: string;
    discountType: string;
    discountValue: number;
    maxDiscount: number;
    minOrderValue: number;
    startDate: Date;
    endDate: Date;
    usageLimit: number;
    usagePerUser: number;
    note: string;
    status: number;
}