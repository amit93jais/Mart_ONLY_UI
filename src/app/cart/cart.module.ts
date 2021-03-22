import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./components/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CartRoutingModule
    ],
    declarations: [
        CartComponent,
        CheckoutComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CartModule { }
