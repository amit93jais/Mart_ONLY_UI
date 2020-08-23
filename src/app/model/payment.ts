export interface Payment{
    id : number;
    invoiceNumber: string;
    paymentOption: string;
    subTotal: number;
    deliveryCharge: number;
    walletCredit: number;
    discount: number;
    total:number;
}

