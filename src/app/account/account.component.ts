import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Router } from "@angular/router";

//import * as Dialogs from "ui/dialogs";
import * as LocalNotifications from "nativescript-local-notifications";
import * as Toast from "nativescript-toast";

@Component({
    selector: "Account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit {

    constructor(private _router: Router) {
    }

    ngOnInit(): void {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    logout(){
        Toast.makeText("Successfully logged out").show();
        this._router.navigate(['/home']);
    }

}
