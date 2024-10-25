export interface IOrder {
    id: number;
    customerName: string;
    phoneNumber: string;
    totalAmount: number;
    paymentMethod: number;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}