import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AddressComponent } from "./address.component";
import { AddAddressComponent } from "./add-address.component";

const routes: Routes = [
    { path: "", component: AddressComponent} ,
    { path: "addAddress", component: AddAddressComponent},
];

@NgModule({
   imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]

})
export class AddressRoutingModule { }
