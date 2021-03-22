import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { getString } from "tns-core-modules/application-settings";
import { UserService } from "~/app/shared/services/user.service";
import { User } from "~/app/shared/models/user";

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

    constructor(private userService: UserService) {
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

    save(){
        this.myValidateDataFormComp.dataForm.validateAll()
        .then(result => {
        if(result === true){
            console.log("User serrvice called for register");
         }
        });
    }

    getUserProfileDetails(){
        let mobileNumber = getString("mobileNumber");
        console.log("mobileNumber: " + mobileNumber);
        if(mobileNumber != undefined && mobileNumber != null){
        this.userService.getProfileDetails(mobileNumber).subscribe(userDetails => this.user = userDetails);
        }
    }
}
