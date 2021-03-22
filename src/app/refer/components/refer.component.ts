import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as SocialShare from "nativescript-social-share";
import {ImageSource, fromFile, fromResource, fromBase64} from "tns-core-modules/image-source";

@Component({
    selector: "Refer",
    templateUrl: "./refer.component.html"
})
export class ReferComponent implements OnInit {

  /*  image = ImageSource.fromFile("~/path/to/myImage.jpg");
    SocialShare.shareImage(image);
    SocialShare.shareImage(image, "How would you like to share this image?");

    SocialShare.shareText("I love NativeScript!");
    SocialShare.shareText("I love NativeScript!", "How would you like to share this text?");

    SocialShare.shareUrl("https://www.nativescript.org/", "Home of NativeScript");
    SocialShare.shareUrl("https://www.nativescript.org/", "Home of NativeScript", "How would you like to share this url?");
     */

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        //SocialShare.shareUrl("https://www.nativescript.org/", "Shoppers Mart");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public shareText() {
        SocialShare.shareText("I love NativeScript!", "How would you like to share this text?");
    }

     public shareImage() {
        ImageSource.fromUrl("https://www.nraboy.com/images/nraboy.png").then((image) => {
            SocialShare.shareImage(image);
        });
    }
}
