import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { WalletComponent } from "./wallet.component";
import { WalletRoutingModule } from "./wallet-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        WalletRoutingModule
    ],
    declarations: [
        WalletComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class WalletModule { }
