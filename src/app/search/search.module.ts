import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SearchComponent } from "./components/search.component";

import { SearchRoutingModule } from "./search-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SearchRoutingModule
    ],
    declarations: [
        SearchComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule { }
