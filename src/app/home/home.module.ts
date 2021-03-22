import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SliceBeforSpace } from "../shared/pipes/slice.space.pipe";
import { HomeComponent } from "./components/home.component";

import { HomeRoutingModule } from "./home-routing.module";


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
