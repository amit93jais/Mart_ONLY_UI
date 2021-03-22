import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import {getString} from "tns-core-modules/application-settings";
import * as app from "tns-core-modules/application";
import { Router } from "@angular/router";
import { AddressService } from "~/app/shared/services/address.service";
import { OrderService } from "~/app/shared/services/order.service";
import { Order } from "~/app/shared/models/order";


@Component({
    selector: "Order",
    moduleId: module.id,
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.css"],
    providers: [OrderService, AddressService]
})
export class OrderComponent implements OnInit {
    orderList : Order[]= [];
    selectedOrder: Order;
    cartLength: number = 3;

    constructor(private orderService : OrderService, private _router: Router) {

    }

    ngOnInit(): void {
        this.getOrders();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getOrders(){
        this.orderService.getAllOrders().subscribe(orders => this.orderList = orders);
    }

    isLoggedIn(){
        let token = getString("token");
        if(token != undefined && token != null)
           return true;
        else
           return false;
    }


    onNavigateOrderDetails(order) {
     this.selectedOrder = order;
     console.log("********* Selected order "+this.selectedOrder.orderId);
    //this._router.navigate(["/orderDetails", id]);
    this._router.navigate(['/order/details/'+order.id], {
    state: {
         order: this.selectedOrder
       // frontEnd: JSON.stringify({ orderNumber: this.selectedOrder.orderId, items: this.selectedOrder.no_of_itmes }),
       // site: 'amit.com'
      }
    });
    }


}
