import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user";


@Injectable({
    providedIn: "root"
})
export class StateService {
    state:{
        isLoading: boolean;
        isLoggedIn: boolean;
        authToken: string;
        loggedInUser$: BehaviorSubject<User>;

    } = {
        isLoading: false,
        isLoggedIn: false,
        authToken: null,
        loggedInUser$: new BehaviorSubject(undefined)
    };

    constructor(private router: Router){}

    setLoading(loading:boolean){
      this.state = {
       ...this.state,
       isLoading: loading,
      };
    }

    setAuthToken(token: string){
        this.state = { ...this.state, authToken: token};
    }

    getAuthToken(): string {
       return this.state.authToken;
    }

    login(user: User){
       this.state = {
           ...this.state,
           isLoggedIn: true
       };
       if(user){
           this.state.loggedInUser$.next(user);
       }else{
           this.router.navigate(["/"]);
       }
    }

    logout(){
        this.state = {
            ...this.state,
            isLoggedIn: false
        };
        this.state.loggedInUser$.next(undefined);
    }


}
