import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";
import { SearchService } from "~/app/shared/services/search.service";
import { ProductQty } from "~/app/shared/models/productQty";
import { CartItem } from "~/app/shared/models/cart-item";


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
    addAllMsg = "Are you sure that you want to add all the products.";

    routeState: any;
    orderId: string;

    constructor(private router: Router, private serService: SearchService) {
        //The below code is used to get data from order component.
        if (this.router.getCurrentNavigation().extras.state) {
            this.routeState = this.router.getCurrentNavigation().extras.state;
            if (this.routeState) {
                this.orderId = this.routeState.orderId;
            }
        }

    }

    ngOnInit(): void {
        this.cartList.forEach( pq =>  {
            this.cartLength = this.cartLength + pq.quantity;
        })

        if(this.orderId != undefined && this.orderId != null){
            //this.isShopFromOrder = true;
            this.getProductByOrder(this.orderId);
          }

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

    refresh(){
        this.orderId = null;
        this.serResult = [];
        //window.location.reload();
    }

    addToCart(productQty: ProductQty) {
        let cartItem :CartItem = {product:productQty.product, quantity:1, userId:101};
        this.cartList.push(cartItem);
        console.log("item in cart list****" + this.cartList.length);
        this.cartLength++;
        productQty.qtyInCart++;
        //call service to update cart

    }

    increaseQty(productQty: ProductQty) {
       productQty.qtyInCart++;
        this.cartLength++;
    }

    decreaseQty(productQty: ProductQty) {
        /* this.cartList.forEach((pq) => {
            if(pq.product.id == product.id){
            pq.qunatity--;
            }
        }); */
        productQty.qtyInCart--;
        this.cartLength--;
    }

    //This method will pass input as order id
    //We have to find Products for this item.
    //Check items avaible
    // and convert this o-item into productQty(op of backend service)
    getProductByOrder(orderId){
        this.serService
        .getProductFromOrder(orderId)
        .subscribe((ser) => (this.serResult = ser));
    }

    /*
    *This will add all item(along with quantity ordered) from this order into cart.
    *If there will be an extra item already in the cart then that will remain same.
    *If same product is alredy in cart.Then adding all items will update the qunatity in prev order.
    */
    addAllToCart(){
        dialogs.confirm(this.addAllMsg).then(result => {
            console.log("Dialog result: " + result);
        });

        this.serResult.forEach((pq) =>{
            let cartItem :CartItem = new CartItem();
            cartItem.product = pq.product;
            cartItem.quantity = 2; //This is quntity in prev order...Call from service

            this.cartList.push(cartItem);
            this.cartLength++;
            pq.qtyInCart++;

        });
        console.log("item in cart list****" + this.cartList.length);
    }


}
