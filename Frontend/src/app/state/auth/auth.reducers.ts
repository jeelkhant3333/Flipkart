import { createReducer , on} from "@ngrx/store"
import { login, loginFailure, loginSuccess, registerFailure, registerSuccess, register } from "./auth.actions"


const initialState = {
    user:null,
    loading:false,
    error:''
}

export const authReducer = createReducer(
    initialState,
    on(login, (state)=> ({...state,loading:true,error:''})),
    on(loginSuccess, (state)=> ({...state,loading:false,error:''})),
    on(loginFailure, (state , {error})=> ({...state,loading:true,error:error})),

    on(register, (state)=> ({...state,loading:true,error:''})),
    on(registerSuccess, (state)=> ({...state,loading:false,error:''})),
    on(registerFailure, (state , {error})=> ({...state,loading:true,error:error})),
)