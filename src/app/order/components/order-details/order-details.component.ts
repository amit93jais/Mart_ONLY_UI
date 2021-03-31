import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ActivatedRoute, Router } from "@angular/router";
import { Order } from "~/app/shared/models/order";
import { Address } from "~/app/address/models/address";
import { AddressService } from "~/app/address/services/address.service";



@Component({
    selector: "Order-Details",
    moduleId: module.id,
    templateUrl: "./order-details.component.html",
    styleUrls: ["./order-details.component.css"]
})
export class OrderDetailsComponent implements OnInit {

    addressList : Address[] = [];
    deliveryAddress : Address;
    private _paramSubcription: any;

    routeState: any;
    order: Order;

    //The Dynamic Component gets dynamic data. We use the history.state to access the product data. Alternatively, we can use the this.router.getCurrentNavigation().extras.state to achieve the same. Please remember getCurrentNavigation only works in the constructor. It will return null if used elsewhere.

    constructor( private _activatedRoute: ActivatedRoute, private router: Router,
        private addressService: AddressService ) {
        //The below code is used to get data from order component.
        //Note If orderId is not null means we are displaying product from previos order
        if (this.router.getCurrentNavigation().extras.state) {
            this.routeState = this.router.getCurrentNavigation().extras.state;
            if (this.routeState) {
                this.order = this.routeState.order;
              //this.data.frontEnd = this.routeState.frontEnd ? JSON.parse(this.routeState.frontEnd) : '';
              console.log("State order*********** "+this.order + " *** "+this.order.orderId);
            }
          }
    }

    ngOnInit(): void {
        let entityName: string;
        this._paramSubcription = this._activatedRoute.params.subscribe(params => entityName = params['id']);
        console.log("detail ngOnInit was called. 0rder Id************** "+ entityName);
        this.getAddress();
       // this.order=history.state.order;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getAddress(){
        this.addressService.getAllAddress().subscribe(addresses => this.addressList = addresses);
        this.deliveryAddress = this.addressList[0];
    }

    shopFromOrder(){
           this.router.navigate(['/search'], {
           state: { orderId: this.order.orderId}
           });
    }

}
