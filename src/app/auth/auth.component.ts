import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../model/user";
import { Page } from "tns-core-modules/ui/page";
import { UserService } from "../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "Auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"],
    providers: [UserService]
})
export class AuthComponent implements OnInit {

    user: User;
    isLoggingIn = true;
    private _paramSubcription: any;
    selectedTabIndex: number = 0;

    constructor(private router: Router, private userService: UserService,
        private page:Page, private _activatedRoute: ActivatedRoute) {
            this.user = new User();

            //this.user.email = "my.test.account@nativescript.org";
            //this.user.password = "mypassword";
        }

    ngOnInit(): void {
        let tab: string;
        this._paramSubcription = this._activatedRoute.params.subscribe(params => tab = params['tab']);
        if(tab == 'signup'){
            this.selectedTabIndex = 1;
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    login() {
        /* this.userService.login(this.user)
            .subscribe(
                () => this.router.navigate(["/list"]),
                (exception) => {
                    if (exception.error && exception.error.description) {
                        alert(exception.error.description);
                    } else {
                        alert(exception)
                    }
                }
            ); */
    }


    signUp() {
        this.userService.register(this.user)
            .subscribe(
                () => {
                    alert("Your account was successfully created.");
                },
                (exception) => {
                    if (exception.error && exception.error.description) {
                        alert(exception.error.description);
                    } else {
                        alert(exception)
                    }
                }
            );
    }

    public onPropertyValidate(args) {
        let validationResult = true;

        if (args.propertyName === "password2") {
            const dataForm = args.object;
            const password1 = dataForm.getPropertyByName("password");
            const password2 = args.entityProperty;
            if (password1.valueCandidate !== password2.valueCandidate) {
                password2.errorMessage = "Passwords do not match.";
                validationResult = false;
            }
        }

        args.returnValue = validationResult;
    }

}
