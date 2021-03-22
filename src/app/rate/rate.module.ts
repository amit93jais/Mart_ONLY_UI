import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { RateComponent } from "./components/rate.component";

import { RateRoutingModule } from "./rate-routing.module";

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
