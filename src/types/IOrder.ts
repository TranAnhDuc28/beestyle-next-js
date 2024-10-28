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
<<<<<<< HEAD
    createAt?: string;
    updateAt?: string;
}

=======
    createdAt?: string;
    updatedAt?: string;
}
>>>>>>> be4cc2f8c258eb45a9281f7553538b4c4b206038
