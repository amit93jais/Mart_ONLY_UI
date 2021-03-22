import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AccountComponent } from "./components/account.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { PasswordChangeComponent } from "./components/password-change/password-change.component";

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
