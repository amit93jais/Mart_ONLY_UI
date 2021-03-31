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
import { StateService } from "~/app/shared/services/state.service";

@Component({
    selector: "Account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.css"],
    providers: [UserService, RestInterceptor]
})
export class AccountComponent implements OnInit {

    user: User;

    constructor(private _router: Router, private stateService: StateService,
        private userService: UserService) {

    }

    ngOnInit(): void {
        this.user = this.stateService.state.loggedInUser$.value;
        //this.getUserProfileDetails();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    logout(){
        this.stateService.logout();
        Toast.makeText("Successfully logged out").show();
        this._router.navigate(['/home']);
    }

    /* isLoggedIn(){
        let token = getString("token");
        if(token != undefined && token != null)
           return true;
        else
           return false;
    } */

}
