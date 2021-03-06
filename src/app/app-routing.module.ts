import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "order", loadChildren: () => import("~/app/order/order.module").then((m) => m.OrderModule) },
    { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule) },
    { path: "account", loadChildren: () => import("~/app/account/account.module").then((m) => m.AccountModule) },
    { path: "wallet", loadChildren: () => import("~/app/wallet/wallet.module").then((m) => m.WalletModule) },
    { path: "rate", loadChildren: () => import("~/app/rate/rate.module").then((m) => m.RateModule) },
    { path: "notifications", loadChildren: () => import("~/app/notifications/notifications.module").then((m) => m.NotificationsModule) },
    { path: "refer", loadChildren: () => import("~/app/refer/refer.module").then((m) => m.ReferModule) },
    { path: "support", loadChildren: () => import("~/app/customer-support/customer-support.module").then((m) => m.CustomerSupportModule) },

    { path: "cart", loadChildren: () => import("~/app/cart/cart.module").then((m) => m.CartModule) },
    { path: "auth/:tab", loadChildren: () => import("~/app/auth/auth.module").then((m) => m.AuthModule) },
    { path: "address", loadChildren: () => import("~/app/address/address.module").then((m) => m.AddressModule)},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
