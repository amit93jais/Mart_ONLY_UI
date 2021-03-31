import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { AccountRoutingModule } from "./account-routing.module";
import { AccountComponent } from "./components/account.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { PasswordChangeComponent } from "./components/password-change/password-change.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        AccountRoutingModule, SharedModule
    ],
    declarations: [
        AccountComponent, ProfileComponent, PasswordChangeComponent
    ],

    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AccountModule { }
