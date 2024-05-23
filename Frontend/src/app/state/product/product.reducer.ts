import { createReducer, on } from "@ngrx/store"
import { findProductByCategorySuccess, findProductByIdSuccess, findProductByIdFailure, findProductByCategoryFailure } from "./product.action"
import { AppState } from "../../models/AppState"




export const initialState = {
    products: [],
    loading: false,
    error: null,
    product: null
}

export const productReducer = createReducer(
    initialState,
    on(findProductByCategorySuccess, (state, { payload }) => {
        console.log("paylod " , payload)
        return {
        ...state,
        products: payload,
        content: payload.content,
        loading: false
    }}),

    on(findProductByIdSuccess, (state, { payload }) => ({
        ...state,
        product: payload,
        loading: false
    })),

    on(findProductByCategoryFailure,
        findProductByIdFailure,
        (state, { error }) => {
        console.log('findProductByCategoryFailure action:', error);
          return { ...state,
            error: error,
            loading: false}

        }),

)