import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Router } from "@angular/router";
import {getNumber, getString, remove} from "tns-core-modules/application-settings";

//import * as Dialogs from "ui/dialogs";
import * as LocalNotifications from "nativescript-local-notifications";
import * as Toast from "nativescript-toast";
import { UserService } from "~/app/shared/services/user.service";
import { User } from "~/app/shared/models/user";
import { RestInterceptor } from "~/app/shared/interceptors/rest.interceptor";

@Component({
    selector: "Account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.css"],
    providers: [UserService, RestInterceptor]
})
export class AccountComponent implements OnInit {

    fName =  getString("firstName");
    lName =  getString("lastName");
    mobileNumber =  getString("mobileNumber");
    email =  getString("email");

    constructor(private _router: Router, private userService: UserService) {

    }

    ngOnInit(): void {
        //this.getUserProfileDetails();
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
        remove("lastName");
        this._router.navigate(['/home']);
    }

    isLoggedIn(){
        let token = getString("token");
        if(token != undefined && token != null)
           return true;
        else
           return false;
    }

    /* getUserProfileDetails(){
        let mobileNumber = getString("mobileNumber");
        console.log("mobileNumber: " + mobileNumber);
        if(mobileNumber != undefined && mobileNumber != null){
        this.userService.getProfileDetails(mobileNumber).subscribe(userDetails => this.user = userDetails);
        }
       } */

}
