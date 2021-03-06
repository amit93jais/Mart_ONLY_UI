import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";
import { SearchService } from "../services/search.service";
import { CartLine } from "~/app/cart/models/cart-line";
import { CartService } from "~/app/cart/services/cart.service";
import { ProductCartQty } from "../models/product-cart-qty";
import { StateService } from "~/app/shared/services/state.service";


@Component({
    selector: "Search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
    searchPhrase: string;
    serResult: ProductCartQty[] = [];
    addAllMsg = "Are you sure that you want to add all the products.";

    routeState: any;
    orderId: string;

    constructor(private router: Router, private serService: SearchService,
        private cartService: CartService, public stateService: StateService) {
        //The below code is used to get data from order component.
        if (this.router.getCurrentNavigation().extras.state) {
            this.routeState = this.router.getCurrentNavigation().extras.state;
            if (this.routeState) {
                this.orderId = this.routeState.orderId;
            }
        }

    }

    ngOnInit(): void {
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
        //console.log(`Input changed! New value: ${searchBar.text}`);
    }

    onClear(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Clear event raised`);
    }

    getProductBySearchKey(serachKey) {
        this.serService.getProductByKey(serachKey)
        .subscribe((ser) => (this.serResult = ser));
        console.log("serach result item****" + this.serResult.length);
    }

    addToCart(productQty: ProductCartQty) {
        this.cartService.addToCart(productQty.product.id, 1)
        .subscribe((result) =>{
            console.log("Add to cart "+result);
            if(result){
             productQty.qtyInCart++;
            }
        });

    }

    increaseQty( productQty: ProductCartQty) {
        this.cartService.increaseQty(productQty.product.id)
        .subscribe((result) =>{
            console.log("Increased Quantity "+result);
            if(result){
             productQty.qtyInCart++;
             this.stateService.state.cartLength = this.stateService.state.cartLength + 1;
            }
        });
     }

    decreaseQty(productQty: ProductCartQty) {
        if(productQty.qtyInCart == 1){
            this.removeProductFromCart(productQty);
        }else{
            this.cartService.decreaseQty(productQty.product.id)
            .subscribe((result) =>{
                console.log("decreased Quantity "+result);
                if(result){
                 productQty.qtyInCart--;
                 this.stateService.state.cartLength = this.stateService.state.cartLength - 1;
                }
            });
        }
    }

    removeProductFromCart(productQty){
        this.cartService.removeProduct(productQty.product.id)
        .subscribe((result) =>{
            console.log("remove "+result);
            if(result){
                productQty.qtyInCart--;
                this.stateService.state.cartLength = this.stateService.state.cartLength - 1;
            }
        });

    }

    refresh(){
        this.orderId = null;
        this.serResult = [];
        //window.location.reload();
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
            let cartItem :CartLine = new CartLine();
            cartItem.product = pq.product;
            cartItem.quantity = 2; //This is quntity in prev order...Call from service

           // this.cartList.push(cartItem);
           // this.cartLength++;
            pq.qtyInCart++;

        });
       // console.log("item in cart list****" + this.cartList.length);
    }


}
