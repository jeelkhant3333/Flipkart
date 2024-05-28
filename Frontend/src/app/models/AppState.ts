import { CartState } from "../state/cart/cart.reducer";
import { ProductState } from "../state/product/product.reducer";

export interface AppState{
    user:UserState,
    auth:any,
    product:ProductState,
    cart:CartState,
    order:any,
}


export interface UserState{
    user:any,
    loading: boolean,
    error: string
}