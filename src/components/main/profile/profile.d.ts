declare interface IProfile {
    email: string;
    emailConfirmed: boolean;
    fullName: string;
    joinDate: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
}

declare interface IProfileTransaction {
    totalAmount: number;
    items: IItem[];
}

declare interface IItem {
    amount: number;
    name: string;
    status: string;
    transactionDate: string;
    transactionId: string;
    type: string;
}