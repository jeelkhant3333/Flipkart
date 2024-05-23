import { createReducer , on} from "@ngrx/store"
import { login, loginFailure, loginSuccess, registerFailure, registerSuccess, register } from "./auth.actions"


const initialState = {
    user:null,
    loading:false,
    error:null
}

export const authReducer = createReducer(
    initialState,
    on(login, (state)=> ({...state,loading:true,error:null})),
    on(loginSuccess, (state , {user})=> ({...state,loading:false,error:null,user})),
    on(loginFailure, (state , {error})=> ({...state,loading:true,error:error})),

    on(register, (state)=> ({...state,loading:true,error:null})),
    on(registerSuccess, (state , {user})=> ({...state,loading:false,error:null,user})),
    on(registerFailure, (state , {error})=> ({...state,loading:true,error:error})),
)