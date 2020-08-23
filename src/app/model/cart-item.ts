import { Product } from "./product";

export interface CartItem {
   // id : number;
    product: Product;
    quantity: number;
   // productId: number;
    userId: number;
}
