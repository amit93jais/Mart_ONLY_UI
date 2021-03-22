import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "Account",
    templateUrl: "./password-change.component.html",
    styleUrls: ["./../account.component.css"]
})
export class PasswordChangeComponent implements OnInit {

    oldPassword: string;
    newPassword: string;
    confirmPassword: string;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    changePassword(){
     if(this.passwordValidate()){
        console.log("Changes password service called");
     }
    }

    public passwordValidate(): boolean {
        let validationResult = true;
            if (this.newPassword !== this.confirmPassword) {
                alert("Password do not match.");
                validationResult = false;
            }
            if(this.newPassword != undefined && this.newPassword.length < 6){
                alert("Password must be atleast 6 character.");
                validationResult = false;
            }

       return validationResult;
    }
}
