import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CartComponent } from "./components/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";

const routes: Routes = [
    { path: "", component: CartComponent },
    { path: "checkout", component: CheckoutComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CartRoutingModule { }
