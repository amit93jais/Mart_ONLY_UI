import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { AuthComponent } from "./components/auth.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIDataFormModule, //---This is used for RadDataForm
        AuthRoutingModule,
        SharedModule,
    ],
    declarations: [
        AuthComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AuthModule { }
