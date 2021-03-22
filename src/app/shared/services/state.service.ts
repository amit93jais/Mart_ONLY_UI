import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
    providedIn: "root"
})
export class StateService {
    state:{
        isLoading: boolean;
        isLoggedIn: boolean;
        authToken: string;
    } = {
        isLoading: false,
        isLoggedIn: false,
        authToken: null
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
}
