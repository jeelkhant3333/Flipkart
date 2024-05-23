import { createAction, props } from "@ngrx/store";

export const user = createAction('[user] user');
export const userSuccess = createAction('[user] user success' , props<{userProfile:any}>());
export const userFailure = createAction('[user] user fail' , props<{error:any}>());

export const logoutSuccess = createAction('[user] Logout success');