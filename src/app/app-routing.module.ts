import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AddAddressComponent } from "./address/add-address.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "order", loadChildren: () => import("~/app/order/order.module").then((m) => m.OrderModule) },
    { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule) },
    { path: "account", loadChildren: () => import("~/app/account/account.module").then((m) => m.AccountModule) },
    { path: "wallet", loadChildren: () => import("~/app/wallet/wallet.module").then((m) => m.WalletModule) },
    { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule) },
    { path: "notifications", loadChildren: () => import("~/app/notifications/notifications.module").then((m) => m.NotificationsModule) },
    { path: "faq", loadChildren: () => import("~/app/faq/faq.module").then((m) => m.FaqModule) },
    { path: "support", loadChildren: () => import("~/app/customer-support/customer-support.module").then((m) => m.CustomerSupportModule) },

    { path: "orderDetails/:id", loadChildren: () => import("~/app/order-details/order-details.module").then((m) => m.OrderDetailsModule) },
    { path: "cart", loadChildren: () => import("~/app/cart/cart.module").then((m) => m.CartModule) },
    { path: "auth/:tab", loadChildren: () => import("~/app/auth/auth.module").then((m) => m.AuthModule) },
    { path: "address", loadChildren: () => import("~/app/address/address.module").then((m) => m.AddressModule)},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
