import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AccountRoutingModule } from "./account-routing.module";
import { AccountComponent } from "./account.component";
import { ProfileComponent } from "./profile.component";
import { PasswordChangeComponent } from "./password-change.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AccountRoutingModule
    ],
    declarations: [
        AccountComponent, ProfileComponent, PasswordChangeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AccountModule { }
