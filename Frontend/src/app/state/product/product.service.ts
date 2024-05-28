import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { findProductByCategoryFailure, findProductByCategorySuccess, findProductByIdFailure, findProductByIdSuccess} from "./product.action";
import { AppState } from "../../models/AppState";
import { ProductState } from "./product.reducer";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    apiUrl = BASE_API_URL

    private getHeader(): HttpHeaders {
        const headers =  new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
        return headers
    }

    constructor(
        private store: Store<ProductState>,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }


    findProductsByCategory(reqData: any) {
        const {
            colors,
            sizes,
            minPrice,
            maxPrice,
            minDiscount,
            category,
            stock,
            sort,
            pageNumber,
            pageSize,
        } = reqData;

        let params = new HttpParams()
            .set('color', colors)
            .set('size', sizes)
            .set('minPrice', minPrice)
            .set('maxPrice', maxPrice)
            .set('minDiscount', minDiscount)
            .set('category', category)
            .set('stock', stock)
            .set('sort', sort)
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);

        const headers = this.getHeader();
        // console.log("headers" , headers);
        return this.http.get(`${this.apiUrl}/api/products`, { headers, params })
        .pipe(
            map((data: any) => {
                    // console.log("product data", data)
                    return data
                }),
                catchError((error) => {
                    console.log("error", error)
                    return of(
                        findProductByCategoryFailure(
                            error.response?.data?.message
                                ? error.response.data.message
                                : error.message
                        )
                    )
                })
            )
        // .pipe(
        //     map((data: any) => {
        //         console.log("product data", data)
        //         return findProductByCategorySuccess({ payload: data})
        //     }),
        //     catchError((error) => {
        //         console.log("error", error)
        //         return of(
        //             findProductByCategoryFailure(
        //                 error.response?.data?.message
        //                     ? error.response.data.message
        //                     : error.message
        //             )
        //         )
        //     })
        // )
        // .subscribe((action)=>{
        //     console.log("action",action.type)
        //     this.store.dispatch(action)})
    }

    
    findProductsById(productId: any) {
      const headers = this.getHeader();
    //   console.log("product id" , productId)
        return this.http.get(`${this.apiUrl}/api/products/id/${productId}`, {headers})
        .pipe(
            map((data: any) => {
                // console.log("Api res data", data)
                return findProductByIdSuccess({payload:data})
            }),
            catchError((error) => {
                console.log("error", error)
                return of(
                    findProductByIdFailure(
                        error.response?.data?.message
                            ? error.response.data.message
                            : error.message
                    )
                )
            })
        ).subscribe((action)=>{
            console.log("Product Action" , action)
            this.store.dispatch(action)
        })
    }
}