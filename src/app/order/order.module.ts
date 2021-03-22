import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderComponent } from './components/order.component';
import { OrderRoutingModule } from './order-routing.module';


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
