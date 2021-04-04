import { Product } from "~/app/shared/models/product";


export interface ProductCartQty {
    product: Product;
    /*This quantity is number of qty added in basket for this product.
    If this product is not added in basket quantity willl be 0.  */
    qtyInCart: number;
}
