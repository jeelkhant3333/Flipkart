import { createAction, props } from '@ngrx/store';

export const cartRequest = '[Cart] Get Cart Request'

export const addItemToCartRequest = createAction(
    '[Cart] Add Item To Cart Request', props<{ reqData: any }>());

export const addItemToCartSuccess = createAction(
    '[Cart] Add Item To Cart Success', props<{ item: any }>());

export const addItemToCartFailure = createAction(
    '[Cart] Add Item To Cart Failure', props<{ error: any }>());

export const getCartRequest = createAction(
    cartRequest);

export const getCartSuccess = createAction(
    '[Cart] Get Cart Success', props<{ payload: any }>());

export const getCartFailure = createAction(
    '[Cart] Get Cart Failure', props<{ error: any }>());

export const removeCartItemRequest = createAction(
    '[Cart] Remove Cart Item Request', props<{ reqData: any }>());

export const removeCartItemSuccess = createAction(
    '[Cart] Remove Cart Item Success', props<{ cartItemId: Number }>());

export const removeCartItemFailure = createAction(
    '[Cart] Remove Cart Item Failure', props<{ error: any }>());

export const updateCartItemRequest = createAction(
    '[Cart] Update Cart Item Request', props<{ reqData: any }>());

export const updateCartItemSuccess = createAction(
    '[Cart] Update Cart Item Success', props<{ payload: any }>());

export const updateCartItemFailure = createAction(
    '[Cart] Update Cart Item Failure', props<{ error: any }>());    