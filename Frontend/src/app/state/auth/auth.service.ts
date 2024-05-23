import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { HttpClient } from "@angular/common/http";
import { map, catchError, of } from "rxjs";
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from "./auth.actions";
import { Store } from "@ngrx/store";



@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private apiUrl = BASE_API_URL + '/auth';

    constructor(private store: Store) { }

    login(logindata: any, http: HttpClient) {
        return http.post(`${this.apiUrl}/signin`, logindata)
            .pipe(
                map((user: any) => {
                    if (user.jwt) {
                        localStorage.setItem("jwt", user.jwt);
                        // console.log(localStorage.getItem("jwt"))
                    }
                    // console.log("user data",user)
                    return loginSuccess(user)
                }),
                catchError((error) => {
                    return of(
                        loginFailure(
                            error.response.data.message && error.response
                                ? error.response.data.message
                                : error.message
                        )
                    )
                })
            ).subscribe((action) => {
                // console.log("action signin" , action.type)
                this.store.dispatch(action)
            })
    }

    register(userData: any, http: HttpClient) {
        return http.post(`${this.apiUrl}/signup`, userData).pipe(
            map((userProfile: any) => {
                if (userProfile.jwt) {
                    localStorage.setItem("jwt", userProfile.jwt);
                    // console.log(userProfile.jwt)
                }

                return registerSuccess(userProfile)
            }),
            catchError((error) => {
                return of(
                    registerFailure(
                        error.response.data.message && error.response
                            ? error.response.data.message
                            : error.message
                    )
                )
            })
        ).subscribe((action) => {
            console.log("action login" ,  action.type)
            this.store.dispatch(action)
        })

    }



}


