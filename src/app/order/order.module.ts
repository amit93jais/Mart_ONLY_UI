import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderDetailsComponent } from './order-details.component';



@NgModule({
    imports: [
        NativeScriptCommonModule,
        OrderRoutingModule
    ],
    declarations: [
        OrderComponent,
        OrderDetailsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OrderModule { }
