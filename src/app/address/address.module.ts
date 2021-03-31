import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { AddressRoutingModule } from "./address-routing.module";
import { AddAddressComponent } from "./components/add-address/add-address.component";
import { AddressComponent } from "./components/address.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        AddressRoutingModule,
        SharedModule
    ],
    declarations: [
        AddressComponent,
        AddAddressComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddressModule { }
