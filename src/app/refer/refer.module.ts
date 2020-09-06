import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ReferRoutingModule } from "./refer-routing.module";
import { ReferComponent } from "./refer.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReferRoutingModule
    ],
    declarations: [
        ReferComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ReferModule { }
