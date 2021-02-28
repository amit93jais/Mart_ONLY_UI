import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { RateRoutingModule } from "./rate-routing.module";
import { RateComponent } from "./rate.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        RateRoutingModule,
    ],
    declarations: [
        RateComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class RateModule { }
