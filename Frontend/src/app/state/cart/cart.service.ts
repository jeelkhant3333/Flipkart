import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BASE_API_URL } from "../../config/api";
import { map, catchError, of, Observable } from "rxjs";
import { addItemToCartFailure, addItemToCartSuccess, getCartFailure, getCartRequest, getCartSuccess, removeCartItemFailure, removeCartItemSuccess, updateCartItemFailure, updateCartItemSuccess } from "./cart.action";
import { AppState } from "../../models/AppState";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    API_BASE_URL = BASE_API_URL;
    constructor(
        private http: HttpClient,
        private store: Store<AppState>
    ) {

    }

    private getHeader(): HttpHeaders {
        const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("jwt")}`)

        return headers
    }

    addItemToCart(reqData: any) {
        const url = `${this.API_BASE_URL}/api/cart/add`;
        const headers = this.getHeader();
        return this.http.put(url, reqData, { headers })
            .pipe(
                map((data: any) => {
                    console.log("added item to cart", data)
                    return addItemToCartSuccess({ item: data})
                }),
                catchError((error: any) => {
                    console.log("error", error)
                    return of(
                        addItemToCartFailure(
                            error.response?.data?.message
                                ? error.response.data.message
                                : error.message
                        ))
                })
            ).subscribe((action) => {
                console.log("action payload",action);
                this.store.dispatch(action)
                this.store.dispatch(getCartRequest())
            })
    }

    getCart(): Observable<any> {
        const url = `${this.API_BASE_URL}/api/cart/`;
        const headers = this.getHeader()
        // console.log("inside api call")
        return this.http.get(url, { headers: headers })

    }

    removeCartItem(cartItemId: Number) {
        const url = `${this.API_BASE_URL}/api/cart_items/${cartItemId}`;
        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        });
        return this.http.delete(url, { headers })
            .pipe(
                map((data: any) => {
                    // console.log("removed item", data)

                    return removeCartItemSuccess({ cartItemId })
                }),
                catchError((error: any) => {
                    // console.log("remove item error", error);

                    return of(
                        removeCartItemFailure(
                            error.response?.data?.message
                                ? error.response.data.message
                                : error.message
                        ))
                })
            ).subscribe(action => {
                console.log("remove cartItem action", action);

                this.store.dispatch(action)
            })
    }

    updateCartItem(reqData: any) {
        // console.log("req", reqData.data);
        // console.log("req id", reqData.cartItemId);
        const url = `${this.API_BASE_URL}/api/cart_items/${reqData.cartItemId}`;
        const headers = this.getHeader();
        return this.http.put(url, reqData.data, { headers })
            .pipe(
                map((data: any) => {
                    // console.log("updated item", data);
                    return updateCartItemSuccess({ payload: data });
                }),
                catchError((error: any) => {
                    // console.log("update cartitem error", error);
                    return of(
                        updateCartItemFailure(
                            error.response?.data?.message
                                ? error.response.data.message
                                : error.message
                        )
                    );
                })
            ).subscribe(action => {
                // console.log("update cartItem action", action);
                this.store.dispatch(action);
            });
    }




}