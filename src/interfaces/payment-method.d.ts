export interface IPaymentMethod {
    _id: string;
    isActive: boolean;
    disabled: boolean;
    bypassActiveValidation: boolean;
    name: boolean;
    type: string;
    code: string;
    integratedPaymentMethod: boolean;
    accountNumber?: string;
    accountName?: string;
}