import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../model/user";

@Component({
    selector: "Profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./account.component.css"]
})
export class ProfileComponent implements OnInit {
    user : User;

    constructor() {
       this.user = new User();
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    save(){

    }
}
