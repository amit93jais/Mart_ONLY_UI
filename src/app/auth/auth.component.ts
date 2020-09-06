import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../model/user";
import { throwError } from "rxjs";
import { Page } from "tns-core-modules/ui/page";
import { UserService } from "../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Person } from "../model/person";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";

const signupMetadata = require('../services/user-signup-metadata.json');

@Component({
    selector: "Auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"],
    providers: [UserService]
})
export class AuthComponent implements OnInit {

    signupUser: User;
    signupMetadata;
    loginUser: User;
    isLoggingIn = true;
    private _paramSubcription: any;
    selectedTabIndex: number = 0;

    @ViewChild('myValidationModesDataForm', { static: false }) myValidateDataFormComp: RadDataFormComponent;

    constructor(private router: Router, private userService: UserService,
        private page:Page, private _activatedRoute: ActivatedRoute) {
            this.loginUser = new User(null, null);
            this.signupUser = new User(null,null,null,null,"user@mart.com",null);
            this.signupMetadata = JSON.parse(JSON.stringify(signupMetadata));
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
       //This is default email we are srtting to pass the validation if user is not providig email
       //since we made email as optional field.
        if(!this.signupUser.email){
            console.log("Set email");
           // The below value setting for  email is not workig so hardcodein whilae invokig user constructor
           // this.myValidateDataFormComp["email"].nativeElement.value = "user@mart.com";
        }

        this.myValidateDataFormComp.dataForm.validateAll()
        .then(result => {
        this.updateTextWithResult(result);
        if(result === true){
            console.log("User serrvice called for register");
             /* this.userService.register(this.user)
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
            ); */
        }
    });
    }

    public updateTextWithResult(validationResult) {
        const validatedValue = "firstName: " + this.myValidateDataFormComp.dataForm.getPropertyByName("firstName").valueCandidate +
            " email: " + this.myValidateDataFormComp.dataForm.getPropertyByName("email").valueCandidate;

            console.log("Validated value: "+validatedValue);
            let result = validationResult;
            console.log("Validation result: "+result);
    }

    public onPropertyValidate(args) {
        let validationResult = true;

        if (args.propertyName === "confirmPassword") {
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


    /* public onPropertyValidateUserName(args) {
        if (args.propertyName === "username") {
           // this._text = "Validating the username: " + args.entityProperty.valueCandidate + "\n";
            //this._isBusy = true;
            args.returnValue = new Promise<Boolean>(resolve => {
                setTimeout(() => {
                    if (this._evenValidation) {
                        args.entityProperty.errorMessage = "This username is already used.";
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                    this._isBusy = false;
                    this._evenValidation = !this._evenValidation;
                }, 1500);
            });
        }
    } */



}
