import { Address } from "./address";
import { Payment } from "./payment";
import { OItem } from "./o-Item";

export interface Order {
    id : number;
    orderId: string;
    orderDate: Date;
    orderStatus: string;
    total: number;
    noOfItmes:number;
    payment: Payment;
    address: Address; //This may change letter...bcoz user may delete some adddress..
    //.then order will not found that address
    items: OItem[];

}
