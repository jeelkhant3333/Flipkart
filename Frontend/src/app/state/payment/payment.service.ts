import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, catchError, of, Observable } from "rxjs";
import { BASE_API_URL } from "../../config/api";
import { AppState } from "../../models/AppState";
import { createPaymentFailure, createPaymentSuccess, updatepaymentFailure, updatepaymentSuccess } from "./payment.action";


@Injectable({
    providedIn: 'root',
})
export class PaymentService {
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

    createPayment(orderId: any) {
        const url = `${this.API_BASE_URL}/api/payments/${orderId}`;
        const headers = this.getHeader();
        return this.http.post(url, {}, { headers })
            .pipe(
                map((data: any) => {
                    console.log("payment success data", data)
                    if (data.payment_link_url) {
                        window.location.href = data.payment_link_url
                    }
                    return createPaymentSuccess({ payload: data })
                }),
                catchError((error: any) => {
                    console.log("payment error", error)
                    return of(
                        createPaymentFailure(
                            error.response?.data?.message
                                ? error.response.data.message
                                : error.message
                        ))
                })
            ).subscribe((action) => {
                this.store.dispatch(action)
            })
    }


    updatePayment(reqData: any) {
        const url = `${this.API_BASE_URL}/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`;
        const headers = this.getHeader();
        return this.http.get(url, { headers })
            .pipe(
                map((data: any) => {
                    console.log("update payment", data)
                    return updatepaymentSuccess({ payload: data })
                }),
                catchError((error: any) => {
                    console.log("payment error", error)
                    return of(
                        updatepaymentFailure(
                            error.response?.data?.message
                                ? error.response.data.message
                                : error.message
                        ))
                })
            ).subscribe((action) => {
                console.log("payment action" , action)
                this.store.dispatch(action)
            })
    }



}