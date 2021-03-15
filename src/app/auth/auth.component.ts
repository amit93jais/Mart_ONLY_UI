import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {
    getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey,remove,clear
} from "tns-core-modules/application-settings";
//import { BehaviorSubject } from "rxjs";
import { User } from "../model/user";
import { Page, Observable } from "tns-core-modules/ui/page";
import { UserService } from "../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
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

    _isRegistered: boolean;

    //private currentUserSubject: BehaviorSubject<any>;
    //public currentUser: Observable<User>;

    @ViewChild('signupModesDataForm', { static: false }) signupDataFormComp: RadDataFormComponent;
    @ViewChild('loginModesDataForm', { static: false }) loginDataFormComp: RadDataFormComponent;

    constructor(private router: Router, private userService: UserService,
        private page:Page, private _activatedRoute: ActivatedRoute) {
            this.loginUser = new User(null, null);
            this.signupUser = new User(null,null,null,null,"",null);
            this.signupMetadata = JSON.parse(JSON.stringify(signupMetadata));

            //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
            //this.currentUser = this.currentUserSubject.asObservable();
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
        this.loginDataFormComp.dataForm.commitAll();
        this.userService.login(this.loginUser)
            .subscribe(
                (user) => {this.router.navigate(["/home"]),
                    setString("token", user.token),
                    setString("fName", user.firstName),
                    setNumber("mobileNumber", user.mobileNumber)
                    console.log("auth componenet fname: "+user.fName);
                },
                (exception) => {
                    if (exception.error && exception.error.description) {
                        alert("Please Check your network connection");
                        console.log("while login des "+exception.error.description);
                    } else {
                        alert("Please Check your network connection");
                        console.log("while login exeception "+exception);
                    }
                }
            );
    }


    signUp() {
        this.signupDataFormComp.dataForm.validateAll()
        .then(result => {
        this.updateTextWithResult(result);
        if(result === true){
             this.userService.register(this.signupUser)
            .subscribe(
                () => {
                    alert("Your account was successfully created."),
                    this.selectedTabIndex =0;
                },
                (exception) => {
                    if (exception.error && exception.error.description) {
                        alert("Please Check your network connection");
                        console.log(exception.error.description);
                    } else {
                        alert("Please Check your network connection");
                        console.log(exception);
                    }
                }
            );
        }
    });
    }

    public updateTextWithResult(validationResult) {
       // const validatedValue = "firstName: " + this.signupDataFormComp.dataForm.getPropertyByName("firstName").valueCandidate;
         //console.log("Validated value: "+validatedValue);

         this.signupDataFormComp.dataForm.commitAll();
        console.log("Validation result: "+validationResult);
    }

     public onPropertyValidate(args) {
         console.log("Asyn call");
        let validationResult = true;
        if (args.propertyName === "confirmPassword") {
            const dataForm = args.object;
            const password1 = dataForm.getPropertyByName("password");
            const password2 = args.entityProperty;
            if (password1.valueCandidate !== password2.valueCandidate) {
                password2.errorMessage = "Passwords do not match.";
                validationResult = false;
            }
            args.returnValue = validationResult;
        }


        if (args.propertyName === "mobileNumber") {
            let mobileNumber = args.entityProperty.valueCandidate;
            let text = "Validating the mobileNumber: " + args.entityProperty.valueCandidate + "\n";
            console.log(text);
            args.returnValue = new Promise<Boolean>(resolve => {
                this.userService.isMobileNumberAlreadyRegistered(mobileNumber)
                    .subscribe(is => this._isRegistered = is);
                setTimeout(() => {

                    console.log("_isRegistered:: "+this._isRegistered);
                    if (this._isRegistered) {
                        args.entityProperty.errorMessage = "This mobile number is already registered with us.";
                        validationResult = false;
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }, 1500);
            });
        }


     }


}
