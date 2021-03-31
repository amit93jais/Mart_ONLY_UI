import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { getString, setString } from "tns-core-modules/application-settings";
import { UserService } from "~/app/shared/services/user.service";
import { User } from "~/app/shared/models/user";
import { Router } from "@angular/router";
import { StateService } from "~/app/shared/services/state.service";


const profileMetadata = require('../../services/profile-metadata.json');

@Component({
    selector: "Profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./../account.component.css"],
    providers: [UserService]
})
export class ProfileComponent implements OnInit {
    user : User;
    profileMetadata;

    @ViewChild('myValidationModesDataForm', { static: false }) myValidateDataFormComp: RadDataFormComponent;

    constructor(private router: Router, private stateService: StateService,
        private userService: UserService) {
      // this.user = new User();
      this.profileMetadata = JSON.parse(JSON.stringify(profileMetadata));
    }

    ngOnInit(): void {
       this.getUserProfileDetails();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    updateProfile(){
        this.myValidateDataFormComp.dataForm.validateAll()
        .then(result => {
        if(result === true){
            this.updateTextWithResult(result);
            this.userService.updateProfile(this.user)
            .subscribe(
                (user) => {
                    alert("Your details are successfully updated."),
                    this.stateService.login(user);
                    /* setString("firstName", user.firstName),
                    setString("lastName", user.lastName),
                    setString("email", user.email),
                    setString("mobileNumber", user.mobileNumber) */
                    this.router.navigate(["/account"])
                }
            );
        }
      });
    }

    public updateTextWithResult(validationResult) {
          this.myValidateDataFormComp.dataForm.commitAll();
     }

    getUserProfileDetails(){
       // let mobileNumber = getString("mobileNumber");
        let mobileNumber = this.stateService.state.loggedInUser$.value.mobileNumber;
        console.log("mobileNumber***: " + mobileNumber);
        if(mobileNumber != undefined && mobileNumber != null){
        this.userService.getProfileDetails(mobileNumber).subscribe(userDetails => this.user = userDetails);
        }
    }
}
