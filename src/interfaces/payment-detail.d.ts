import { IPaymentMethod } from "./payment-method";

export interface IPaymentDetail {
    _id: string;
    transactionDate: string;
    paymentStatus: string;
    transactionStatus: string;
    showAsAnonymous: boolean;
    isManual: boolean;
    isChecked: boolean;
    paymentMethodId: string;
    transactionType: string;
    transactionNumber: string;
    total: number;
    donorName: string;
    donorNote: string;
    donorEmail: string;
    donorPhone: string;
    appSource: string;
    createdAt: string;
    updatedAt: string;
    amount: number;
    uniqCode: number;
    __v: string;
    paymentMethod: IPaymentMethod
}