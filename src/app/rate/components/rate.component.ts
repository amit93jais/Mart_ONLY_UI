import { Component, Inject, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Utils } from "@nativescript/core";

@Component({
    selector: "Rate",
    templateUrl: "./rate.component.html"
})
export class RateComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
       // Utils.openUrl("https://docs.nativescript.org/core-concepts/utils");
        Utils.openUrl("https://play.google.com/store/apps/details?id=com.whereismytrain.android&utm_campaign=shareApp&utm_medium=app&utm_source=wimt");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
