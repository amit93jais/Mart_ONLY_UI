import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import * as app from "tns-core-modules/application";
import { SearchService } from "../services/search.service";
import { Product } from "../model/product";
import { CartItem } from "../model/cart-item";
import { ProductQty } from "../model/productQty";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
    providers: [SearchService],
})
export class SearchComponent implements OnInit {
    searchPhrase: string;
    serResult: ProductQty[] = [];
    cartList: CartItem[] = [];
    cartLength: number = 3;


    constructor(private serService: SearchService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.cartList.forEach( pq =>  {
            this.cartLength = this.cartLength + pq.quantity;
        })

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onSubmit(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Searching for ${searchBar.text}`);
        this.getProductBySearchKey(searchBar.text);
        searchBar.dismissSoftInput();
    }

    onTextChanged(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Input changed! New value: ${searchBar.text}`);
    }

    onClear(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Clear event raised`);
    }

    getProductBySearchKey(serachKey) {
        this.serService
            .getProductByKey(serachKey)
            .subscribe((ser) => (this.serResult = ser));
        console.log("serach by key****" + this.serResult.length);
    }

    addToCart(productQty: ProductQty) {
        let cartItem :CartItem = {product:productQty.product, quantity:1, userId:101};
        this.cartList.push(cartItem);
        console.log("item in cart list****" + this.cartList.length);
        this.cartLength++;
        productQty.quantity++;
        //call service to update cart

    }

   /*  isProductExistInCart(product) {
        if (this.cartIdList.indexOf(product.id) > -1) return true;
        else return false;
    } */


    increaseQty(productQty: ProductQty) {
       productQty.quantity++;
        this.cartLength++;
    }

    decreaseQty(productQty: ProductQty) {
        /* this.cartList.forEach((pq) => {
            if(pq.product.id == product.id){
            pq.qunatity--;
            }
        }); */
        productQty.quantity--;
        this.cartLength--;
    }
}
