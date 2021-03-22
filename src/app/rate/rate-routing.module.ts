import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { RateComponent } from "./components/rate.component";

const routes: Routes = [
    {
    path: "",
    component: RateComponent,
     }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class RateRoutingModule { }
