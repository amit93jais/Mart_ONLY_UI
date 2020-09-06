import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { OrderComponent } from "./order.component";
import { OrderDetailsComponent } from "./order-details.component";

const routes: Routes = [
    { path: "", component: OrderComponent },
    { path: "details/:id", component: OrderDetailsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class OrderRoutingModule { }
