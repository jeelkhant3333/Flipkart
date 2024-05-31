import { CartState } from "../state/cart/cart.reducer";
import { OrderState } from "../state/orders/orders.reducer";
import { ProductState } from "../state/product/product.reducer";

export interface AppState{
    user:UserState,
    auth:any,
    product:ProductState,
    cart:CartState,
    order:OrderState,
}


export interface UserState{
    user:any,
    address:any[]
    loading: boolean,
    error: string
}