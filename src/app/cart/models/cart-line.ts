import { Product } from "~/app/shared/models/product";

export class CartLine {
     id : number;
    product: Product;
    quantity: number;
    productId: number;
    cartId: number;
}
