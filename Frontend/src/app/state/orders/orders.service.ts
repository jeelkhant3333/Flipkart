import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BASE_API_URL } from "../../config/api";
import { map, catchError, of } from "rxjs";
import { createOrderFailure, createOrderSuccess, getOrderByIdFailure, getOrderByIdSuccess, getOrderHistoryFailure, getOrderHistoryRequest, getOrderHistorySuccess } from "./orders.action";
import { AppState } from "../../models/AppState";

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    API_BASE_URL = BASE_API_URL;
    headers: any

    constructor(
        private store: Store<AppState>,
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('jwt')}'`,
            'Content-Type': 'application/json',
        });
    }

    createOrder(reqData: any) {
        console.log("order req" , reqData);
        
        const url = `${this.API_BASE_URL}/api/orders/`;
        return this.http.post(url, reqData, { headers: this.headers })
            .pipe(
                map((data: any) => {
                    if (data.id) {
                        this.router.navigate([`/checkout/payment/${data.id}`], {
                            queryParams: { step: '3', order_id: data.id },
                        });
                    }
                    console.log('created order', data);
                    return createOrderSuccess({ order: data });
                }),
                catchError((error: any) => {
                    console.log("order created error" , error)
                    return of(
                        createOrderFailure(
                            error.response?.data?.message
                                ? error.response.data.message
                                : error.message
                        ))
                })
            ).subscribe((action) => this.store.dispatch(action));
    }

    getOrderById(orderId: string) {
        // console.log("orderid" , orderId);
        const url = `${this.API_BASE_URL}/api/orders/${orderId}`;
        return this.http.get(url, { headers: this.headers })
            .pipe(
                map((data: any) => {
                    console.log('order by id', data);
                    return getOrderByIdSuccess({ order: data })
                }),
                catchError((error: any) => {
                    return of(
                        getOrderByIdFailure(
                            error.response?.data?.message
                                ? error.response.data.message
                                : error.message
                        ))
                })
            ).subscribe((action) => this.store.dispatch(action));
    }

    getOrderHistory() {
        const url = `${this.API_BASE_URL}/api/orders/user`;
        return this.http
            .get(url, { headers: this.headers })
            .pipe(
                map((data) => {
                    console.log('order history', data);
                    return getOrderHistorySuccess({ orders: data });
                }),
                catchError((error: any) => {
                    console.log("history error" , error);
                    
                    return of(
                        getOrderHistoryFailure(
                            error.response?.data?.message
                                ? error.response.data.message
                                : error.message
                        ))
                })
            ).subscribe((action) => this.store.dispatch(action));
    }
}