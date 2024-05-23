import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { response } from "express";
import { userFailure } from "./user.action";
// import { logoutSuccess, userFailure, userSuccess } from "./user.action";


@Injectable({
    providedIn : 'root'
})

export class UserService{

    private apiUrl = BASE_API_URL+'/api/users';
    headers:any;
    

    constructor(private store:Store){
        if(typeof localStorage !== 'undefined'){
            this.headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
        }
        
    }

    getUserProfile(http:HttpClient){
        return http.get(`${this.apiUrl}/profile`,{headers:this.headers})
        .pipe(
            map((userProfile:any)=>{
                return userProfile
            }),
            catchError((error)=>{
                console.log("error",error)
                return of(
                    userFailure(
                        error.response?.data?.message
                         ? error.response.data.message 
                         : error.message
                    )
                )
            })
        )
    }



}