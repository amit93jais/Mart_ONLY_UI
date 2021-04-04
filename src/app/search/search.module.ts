import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { SearchComponent } from "./components/search.component";

import { SearchRoutingModule } from "./search-routing.module";

@NgModule({
    imports: [
        SharedModule,
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
