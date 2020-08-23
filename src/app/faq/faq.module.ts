import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { FaqRoutingModule } from "./faq-routing.module";
import { FaqComponent } from "./faq.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FaqRoutingModule
    ],
    declarations: [
        FaqComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FaqModule { }
