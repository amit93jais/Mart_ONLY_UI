import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Router } from "@angular/router";
import {getNumber, getString} from "tns-core-modules/application-settings";

//import * as Dialogs from "ui/dialogs";
import * as LocalNotifications from "nativescript-local-notifications";
import * as Toast from "nativescript-toast";
import {remove} from "tns-core-modules/application-settings";
import { UserService } from "../services/user.service";
import { User } from "../model/user";

@Component({
    selector: "Account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.css"],
    providers: [UserService]
})
export class AccountComponent implements OnInit {

    user: User;

    constructor(private _router: Router, private userService: UserService) {
    }

    ngOnInit(): void {
        this.getUserProfileDetails();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    logout(){
        Toast.makeText("Successfully logged out").show();
        remove("token");
        remove("mobileNumber");
        remove("firstName");
        this._router.navigate(['/home']);
    }

    isLoggedIn(){
        let token = getString("token");
        if(token != undefined && token != null)
           return true;
        else
           return false;
    }

    getUserProfileDetails(){
        let mobileNumber = getNumber("mobileNumber");
        this.userService.getProfileDetails(mobileNumber).subscribe(userDetails => this.user = userDetails);
       }

}
