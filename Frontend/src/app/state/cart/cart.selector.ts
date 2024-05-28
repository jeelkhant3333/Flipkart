import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.reducer";
import { state } from "@angular/animations";

export const cartState = createFeatureSelector<CartState>('cart')

export const getCartItems = createSelector(cartState,(state:CartState)=>{
    // console.log("inside selector", state)
    return state.cartItems
})

export const getCart = createSelector(cartState,(state:CartState)=>{
    console.log("inside cart selector", state)
    return state
})