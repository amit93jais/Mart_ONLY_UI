import { Component } from "@angular/core";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { EventData } from "tns-core-modules/data/observable";
import { StateService } from "../../services/state.service";

@Component({
    selector: 'app-spinner',
    templateUrl: "./spinner.component.html"
})
export class SpinnerComponent {

    constructor(private stateService: StateService){}
    //isBusy: boolean = true;

    onBusyChanged(args: EventData) {
        let indicator: ActivityIndicator = <ActivityIndicator>args.object;
        console.log("indicator.busy changed to: " + indicator.busy);
    }
}
