import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { CustomerSupportComponent } from "./components/customer-support.component";

import { CustomerSupportRoutingModule } from "./customer-support-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CustomerSupportRoutingModule
    ],
    declarations: [
        CustomerSupportComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CustomerSupportModule { }
