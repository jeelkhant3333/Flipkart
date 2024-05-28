import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { response } from "express";
import { userFailure, userSuccess } from "./user.action";
import { AppState } from "../../models/AppState";
// import { logoutSuccess, userFailure, userSuccess } from "./user.action";


@Injectable({
    providedIn : 'root'
})

export class UserService{

    private apiUrl = BASE_API_URL+'/api/users';
    headers:any;
    

    constructor(private store:Store<AppState>, private http:HttpClient){
        if(typeof localStorage !== 'undefined'){
            this.headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
        }
        
    }

    getUserProfile(){
        // console.log('user header' , this.headers)
        return this.http.get(`${this.apiUrl}/profile`,{headers:this.headers})
        .pipe(
            map((userProfile:any)=>{
                // console.log("user userprofile" , userProfile)
                return userSuccess({userProfile:userProfile})
            }),
            catchError((error)=>{
                // console.log("user error",error)
                return of(
                    userFailure(
                        error.response?.data?.message
                         ? error.response.data.message 
                         : error.message
                    )
                )
            })
        ).subscribe((action)=>{
            this.store.dispatch(action)
        })
    }



}