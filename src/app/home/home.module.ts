import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { SliceBeforSpace } from "../services/slice.space.pipe";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
    ],
    declarations: [
        HomeComponent,
        SliceBeforSpace
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
