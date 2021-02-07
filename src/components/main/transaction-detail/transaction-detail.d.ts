declare interface ITransactionDetail {
    lines: ILineTransaction[];
    paymentName: string;
    vaNumber: string;
    amount: string;
    status: string;
}

declare interface ILineTransaction {
    itemType: string;
    itemName: string;
    transactionId: string;
    transactionDate: string;
    amount: string;
}