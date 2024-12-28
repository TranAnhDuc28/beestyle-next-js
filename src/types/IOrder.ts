import {IVoucher} from "@/types/IVoucher";
import {IAddress} from "@/types/IAddress";

export interface IOrder {
    id: number;
    orderTrackingNumber: string;
    customerId?: number;
    customerName?: string;
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
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}

export interface IOrderDetail {
    id: number;
    orderTrackingNumber: string;
    customerId?: number;
    customerInfo?: ICustomer;
    voucherId?: number;
    voucherInfo?: IVoucher;
    shippingAddressId?: number;
    shippingAddress?: IAddress;
    phoneNumber?: string;
    shippingFee?: number;
    totalAmount?: number;
    paymentMethod?: string;
    isPrepaid?: boolean;
    paymentDate?: Date;
    orderChannel?: string;
    orderType?: string;
    orderStatus?: string;
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
    shippingAddressId?: number;
    shippingFee?: number;
    totalAmount?: number;
    paymentDate?: Date;
    paymentMethod?: string;
    isPrepaid?: boolean;
    pickupMethod?: string;
    orderChannel?: string;
    orderType?: string;
    orderStatus?: string;
    note?: string;
}
