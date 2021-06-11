declare interface ITransactionDetail {
    lines: ILineTransaction[];
    paymentName: string;
    accountNumber: string;
    vaNumber: string;
    amount: number;
    total: number;
    status: string;
}

declare interface ILineTransaction {
    itemType: string;
    itemName: string;
    transactionId: string;
    transactionDate: string;
    amount: string;
    donorName: string;
}