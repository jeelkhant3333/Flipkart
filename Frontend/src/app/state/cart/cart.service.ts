import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BASE_API_URL } from "../../config/api";
import { map, catchError, of } from "rxjs";
import { addItemToCartFailure, addItemToCartSuccess, getCartFailure, getCartSuccess, removeCartItemFailure, removeCartItemSuccess, updateCartItemFailure, updateCartItemSuccess } from "./cart.action";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    API_BASE_URL = BASE_API_URL;
    constructor(
       private http:HttpClient
    ) {

     }

     private getHeader(): HttpHeaders {
        const headers =  new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
        // console.log("headers" , headers);
       
        return headers
    }

    addItemToCart(reqData: any) {
        const url = `${this.API_BASE_URL}/api/cart/add`;
        const headers = this.getHeader();        
        return this.http.put(url, reqData, { headers })
            .pipe(
                map((data: any) => {
                    console.log("added item ", data)
                    return data
                }),
                catchError((error: any) => {
                    console.log("error",error)
                    return of(
                        addItemToCartFailure(
                        error.response?.data?.message
                            ? error.response.data.message
                            : error.message
                    ))
                })
            )
    }

    getCart() {
        const url = `${this.API_BASE_URL}/api/cart/`;
        // const headers = new HttpHeaders({
        //     'Authorization': `Bearer ${localStorage.getItem('jwt')}'`,
        //     'Content-Type': 'application/json',
        // });
        const headers = this.getHeader()
        return this.http.get(url, { headers }).pipe(
            map((data: any) => {
                console.log("cart", data)
                getCartSuccess({ payload: data })
                return  data
            }),
            catchError((error: any) => {
                return of(
                    getCartFailure(
                        error.response?.data?.message
                            ? error.response.data.message
                            : error.message
                    ))
            })
        )
    }

    removeCartItem(cartItemId: Number) {
        const url = `${this.API_BASE_URL}/api/cart_items/${cartItemId}`;
        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        });
        return this.http.delete(url, { headers }).pipe(
            map((data: any) => {
                console.log("removed item", data)
                removeCartItemSuccess({ cartItemId })
                return data
            }),
            catchError((error: any) => {
                return of(
                    removeCartItemFailure(
                        error.response?.data?.message
                            ? error.response.data.message
                            : error.message
                    ))
            })
        )
    }

    updateCartItem(reqData: any) {
        console.log("req" , reqData.data.quantity)
        const url = `${this.API_BASE_URL}/api/cart_items/${reqData.cartItemId}`;        
        const headers = this.getHeader()
        return this.http.put(url,reqData.data.quantity,{ headers }).pipe(
            map((data: any) => {
                console.log("updated item", data)
                updateCartItemSuccess({ payload: data })
                return data
            }),
            catchError((error: any) => {
                return of(
                    updateCartItemFailure(
                        error.response?.data?.message
                            ? error.response.data.message
                            : error.message
                    ))
            })
        )
    }



}