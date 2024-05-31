import { createReducer, on, Action } from '@ngrx/store';
import { createPaymentSuccess, updatepaymentSuccess } from './payment.action';
import { stat } from 'fs';
import { updateCartItemSuccess } from '../cart/cart.action';

export interface PaymentState {
    loading: boolean;
    error: string | null;
    order: any | null;
    orders: any[];
}

const initialState: PaymentState = {
    loading: false,
    error: null,
    order: null,
    orders: [],
};

export const paymentReducer = createReducer(
    initialState,
   on(updatepaymentSuccess, (state,action)=>({
    ...state,
    order:action.payload
   }))
)