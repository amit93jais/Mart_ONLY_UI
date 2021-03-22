import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ReferComponent } from "./components/refer.component";

import { ReferRoutingModule } from "./refer-routing.module";

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
