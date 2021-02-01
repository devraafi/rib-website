export interface IZakatPayload {
    paymentMethodId: string;
    zakats: IZakat[];
    customerInfo: customerInfo;
    amount: number;
    shadaqahAmount: number;
    fidyahAmount: number;
}

export interface IZakat {
    zakatId: string;
    items: IItem[];
    amount: number;
}

export interface IItem {
    zakatItemName: string;
    amount: number;
    isCredit: boolean;
}

export interface customerInfo {
    fullName: string;
    notes: string;
    phone: string;
    email: string;
    showAsAnonymous: boolean;
}