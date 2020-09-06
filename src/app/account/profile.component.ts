import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../model/user";
import { UserService } from "../services/user.service";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";

const profileMetadata = require('../services/profile-metadata.json');

@Component({
    selector: "Profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./account.component.css"],
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
     this.userService.getProfileDetails().subscribe(userDetails => this.user = userDetails);
    }
}
