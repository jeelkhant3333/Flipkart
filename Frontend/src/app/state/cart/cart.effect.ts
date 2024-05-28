import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CartService } from "./cart.service";
import { catchError, exhaustMap, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { cartRequest, getCartFailure, getCartRequest, getCartSuccess, removeCartItemSuccess } from "./cart.action";

@Injectable()
export class CartEffect {

  constructor(private actions$: Actions, private cartService: CartService) {}

  loadCart = createEffect(() =>
   { 
    // console.log("inside effect")
    
    return this.actions$.pipe(
      ofType(getCartRequest,removeCartItemSuccess),
      switchMap(() =>
        this.cartService.getCart().pipe(
          map((data) => {
            // console.log("API data received:", data);
            return getCartSuccess({ payload: data });
          }),
          catchError((error) => {
            // console.error("API error:", error);
            return of(getCartFailure({ error: error }));
          })
        )
      )
    )}
  );
}
