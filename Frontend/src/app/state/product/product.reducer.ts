import { createReducer, on } from "@ngrx/store"
import { findProductByCategorySuccess, findProductByIdSuccess, findProductByIdFailure, findProductByCategoryFailure } from "./product.action"
import { AppState } from "../../models/AppState"


export interface ProductState {
    products: any[]
    product: any; 
    loading: boolean;
    error: any;
}

export const initialState: ProductState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};
export const productReducer = createReducer(
    initialState,
    on(findProductByCategorySuccess, (state,action) => {
        // console.log("paylod " , payload)
        return {
        ...state,
        products: action.payload,
        // content: payload.content,
        loading: false
    }}),

    on(findProductByIdSuccess, (state, action) => {
        console.log("action reducer" , action.payload)
       return {
            ...state,
            product: action.payload,
            loading: false,
            error:null
        
    }
       }),

    on(findProductByCategoryFailure,
        findProductByIdFailure,
        (state, { error }) => {
        console.log('findProductByCategoryFailure action:', error);
          return { ...state,
            error: error,
            loading: false}

        }),

)