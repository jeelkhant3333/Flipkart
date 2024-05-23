import { createAction, props } from "@ngrx/store";

export const login = createAction('[auth] login' , props<{email:String , password:String}>());
export const loginSuccess = createAction('[auth] login success' , props<{user:any}>());
export const loginFailure = createAction('[auth] login fail' , props<{error:any}>());

export const register = createAction('[auth] register' , props<{user:any}>());
export const registerSuccess = createAction('[auth] register success' , props<{user:any}>());
export const registerFailure = createAction('[auth] register fail' , props<{error:any}>());