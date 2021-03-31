import { Component, DoCheck, OnChanges, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import * as Toast from "nativescript-toast";
import * as SocialShare from "nativescript-social-share";
import { Utils } from "@nativescript/core";
import {getNumber, getString, remove} from "tns-core-modules/application-settings";
import { StateService } from "./shared/services/state.service";


@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit, DoCheck {

    fName:string = "";
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private routerExtensions: RouterExtensions,
        private stateService: StateService) {

    }

    ngDoCheck(){
        if(this.stateService.state.isLoggedIn)
        this.fName = this.stateService.state.loggedInUser$.value.firstName;
    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    shareWithFriend(){
        SocialShare.shareUrl("Try out this awesome app on Google Play! \n https://www.nativescript.org/", "Shoppers Mart");
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    rateUs(){
        Utils.openUrl("https://docs.nativescript.org/core-concepts/utils");
        //Utils.openUrl("https://play.google.com/store/apps/details?id=com.whereismytrain.android&utm_campaign=shareApp&utm_medium=app&utm_source=wimt");
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    logout(){
        this.stateService.logout();
        /* remove("token");
        remove("mobileNumber");
        remove("firstName"); */
        this.router.navigate(['/home']);
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
        Toast.makeText("Successfully logged out").show();
    }
}
