import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.action';

export interface CartState {
    cartItems: any[];
    totalPrice: number,
    totalDiscountedPrice: number,
    discount: number,
    loading: boolean;
    error: any;
}

const initialState: CartState = {
    cartItems: [],
    totalPrice: 0,
    totalDiscountedPrice: 0,
    discount: 0,
    loading: false,
    error: null,
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
        cartItems: [...state.cartItems, action.item],
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
        totalPrice: action.payload.totalPrice,
        totalDiscountedPrice: action.payload.totalDiscountedPrice,
        discount: action.payload.discount
    })),

    // on(CartActions.removeCartItemSuccess, (state, action) => ({
    //     ...state,
    //     loading: false,
    //     cartItems: state.cartItems,
    //     totalPrice: state.totalPrice,
    //     totalDiscountedPrice: state.totalDiscountedPrice,
    //     discount: state.discount       
    // })),

    // on(CartActions.updateCartItemSuccess, (state, action) => (
    //     {
    //     ...state,
    //     loading: false,
    //     cartItems: state.cartItems.map((item) =>
    //         item.id === action.payload.id ? action.payload : item
    //     ),
    //     totalPrice: state.totalPrice,
    //     totalDiscountedPrice: state.totalDiscountedPrice,
    //     discount: state.discount   
    // })),
    on(CartActions.removeCartItemSuccess, (state, action) => {
        const updatedCartItems = state.cartItems.filter(item => item.id !== action.cartItemId);

        // Recalculate total price and discount
        const totalPrice = updatedCartItems.reduce((acc, item) => acc + item.price, 0);
        const totalDiscountedPrice = updatedCartItems.reduce((acc, item) => acc + item.discountedPrice , 0);
        const discount = totalPrice - totalDiscountedPrice;

        return {
            ...state,
            loading: false,
            cartItems: updatedCartItems,
            totalPrice,
            totalDiscountedPrice,
            discount,
        };
    }),

    on(CartActions.updateCartItemSuccess, (state, action) => {
        const updatedCartItems = state.cartItems.map(item =>
            item.id === action.payload.id ? action.payload : item
        );

        const totalPrice = updatedCartItems.reduce((acc, item) => acc + item.price, 0);
        const totalDiscountedPrice = updatedCartItems.reduce((acc, item) => acc + item.discountedPrice, 0);
        const discount = totalPrice - totalDiscountedPrice;

        return {
            ...state,
            loading: false,
            cartItems: updatedCartItems,
            totalPrice,
            totalDiscountedPrice,
            discount,
        };
    }),
)