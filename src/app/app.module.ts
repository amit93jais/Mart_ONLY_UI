import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
//import { SliceBeforSpace } from "./services/slice.space.pipe";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        //Added for Validators
        //tns plugin add nativescript-ui-dataform
        NativeScriptUIDataFormModule,

    ],
    declarations: [
        AppComponent,
     //   SliceBeforSpace
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
