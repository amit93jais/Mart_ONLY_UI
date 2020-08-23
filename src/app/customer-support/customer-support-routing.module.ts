import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CustomerSupportComponent } from "./customer-support.component";

const routes: Routes = [
    { path: "", component: CustomerSupportComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CustomerSupportRoutingModule { }
