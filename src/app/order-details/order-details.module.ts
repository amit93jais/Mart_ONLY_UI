import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { OrderDetailsComponent } from './order-details.component';



@NgModule({
    imports: [
        NativeScriptCommonModule,
        OrderDetailsRoutingModule
    ],
    declarations: [
        OrderDetailsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OrderDetailsModule { }
