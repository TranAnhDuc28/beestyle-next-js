export interface IOrder {
    id: number;
    orderTrackingNumber: string;
    customerId: number;
    customerName?: string;
    voucherId?: string
    voucherName?: string
    phoneNumber: string;
    shippingFee: number;
    totalAmount: number;
    paymentDate: Date;
    paymentMethod: string;
    pickupMethod: string;
    orderChannel: string;
    orderStatus: string;
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}

export interface IOrderCreateOrUpdate {
    id?: number;
    orderTrackingNumber?: string;
    customerId?: number;
    voucherId?: string
    phoneNumber?: string;
    shippingFee?: number;
    totalAmount?: number;
    paymentDate?: Date;
    paymentMethod?: string;
    pickupMethod?: string;
    orderChannel?: string;
    orderType?: string;
    orderStatus?: string;
    note?: string;
}
