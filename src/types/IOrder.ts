export interface IOrder {
    id: number;
    customerName: string;
    phoneNumber: string;
    totalAmount: number;
    paymentMethod: string;
    shippingFee: number;
    orderTrackingNumber: string;
    orderChannel: string
    orderStatus: string;
    voucher?: string
    status?: string;
    createAt?: string;
    updateAt?: string;
}

