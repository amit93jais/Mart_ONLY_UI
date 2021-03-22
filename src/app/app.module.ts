import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RestInterceptor } from "./shared/interceptors/rest.interceptor";
import { SharedModule } from "./shared/shared.module";
import { SpinnerInterceptor } from "./shared/interceptors/spinner.interceptor";
//import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        SharedModule,
        //NativeScriptUIListViewModule,
        //Added for Validators
        //tns plugin add nativescript-ui-dataform
        NativeScriptUIDataFormModule,

    ],
    declarations: [
        AppComponent,
    ],
    providers:[
     {provide: HTTP_INTERCEPTORS, useClass: RestInterceptor, multi:true},
     {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi:true}
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
