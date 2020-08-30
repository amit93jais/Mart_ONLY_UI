import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AccountComponent } from "./account.component";
import { ProfileComponent } from "./profile.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { PasswordChangeComponent } from "./password-change.component";

const routes: Routes = [
    { path: "", component: AccountComponent },
    { path: "profile", component: ProfileComponent },
    {path: "password/change", component: PasswordChangeComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule, NativeScriptFormsModule]
})
export class AccountRoutingModule { }
