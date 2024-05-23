// import { createReducer , on} from "@ngrx/store"
// import { logoutSuccess, user, userFailure, userSuccess } from "./user.action"


// const initialState = {
//     userProfile:null,
//     loading:false,
//     error:null
// }

// export const userReducer = createReducer(
//     initialState,
//     on(user, (state)=> ({...state,loading:true,error:null})),
//     on(userSuccess, (state , {userProfile})=> ({...state,loading:false,error:null,userProfile})),
//     on(userFailure, (state , {error})=> ({...state,loading:true,error:error})),

//     on(logoutSuccess, ()=>initialState)
// )


import { createReducer, on } from "@ngrx/store";
import { logoutSuccess, user, userFailure, userSuccess } from "./user.action";

const initialState = {
    user: null,
    loading: false,
    error: null
}

export const userReducer = createReducer(
    initialState,
    on(user, state => ({ ...state, loading: true, error: null })),
    on(userSuccess, (state, { userProfile }) => ({ ...state, loading: false, error: null,userProfile})),
    on(userFailure, (state, { error }) => ({ ...state, loading: false, error: error })),
    on(logoutSuccess, () => initialState)
);
