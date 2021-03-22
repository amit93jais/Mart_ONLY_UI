import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { OrderDetailsComponent } from "./components/order-details/order-details.component";
import { OrderComponent } from "./components/order.component";


const routes: Routes = [
    { path: "", component: OrderComponent },
    { path: "details/:id", component: OrderDetailsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class OrderRoutingModule { }
