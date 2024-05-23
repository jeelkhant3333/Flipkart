import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.action';

export interface CartState {
    cartItems: any[];
    loading: boolean;
    error: any;
    cart: any
}


const initialState: CartState = {
    cartItems: [],
    loading: false,
    error: null,
    cart: null,
};

export const cartReducer = createReducer(
    initialState,

    on(CartActions.addItemToCartRequest,
        CartActions.getCartRequest,
        CartActions.removeCartItemRequest,
        CartActions.updateCartItemRequest, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),

    on(CartActions.addItemToCartSuccess, (state, action) => ({
        ...state,
        loading: false,
        cartItems: [...state.cartItems, action.payload],
    })),

    on(CartActions.addItemToCartFailure,
        CartActions.getCartFailure,
        CartActions.removeCartItemFailure,
        CartActions.updateCartItemFailure,
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error,
        })),

    on(CartActions.getCartSuccess, (state, action) => ({
        ...state,
        loading: false,
        cartItems: action.payload.cartItems,
        cart: action.payload
    })),

    on(CartActions.removeCartItemSuccess, (state, action) => ({
        ...state,
        loading: false,
        cartItems: state.cartItems.filter((item) => item.id !== action.
            cartItemId),
    })),

    on(CartActions.updateCartItemSuccess, (state, action) => ({
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id ? action.payload : item
        ),
    })),
)