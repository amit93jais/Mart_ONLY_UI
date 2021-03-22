import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { RestInterceptor } from "./interceptors/rest.interceptor";
import { SpinnerInterceptor } from "./interceptors/spinner.interceptor";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptUISideDrawerModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule, //---This is used for RadDataForm
    ],
    declarations: [
        SpinnerComponent
    ],

    exports:[
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIDataFormModule,
        NativeScriptRouterModule,
        NativeScriptUISideDrawerModule,
        NativeScriptHttpClientModule,
        SpinnerComponent,
    ],

    providers:[
        {provide: HTTP_INTERCEPTORS, useClass: RestInterceptor, multi:true},
        {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi:true}
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
