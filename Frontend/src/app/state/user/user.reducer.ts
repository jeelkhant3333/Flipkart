
import { createReducer, on } from "@ngrx/store";
import { logoutSuccess, user, userFailure, userSuccess } from "./user.action";
import { UserState } from "../../models/AppState";

const initialState = {
    user: [],
    loading: false,
    error: '',
}

export const userReducer = createReducer(
    initialState,
    on(user, state => ({ ...state, loading: true, error: '' })),
    on(userSuccess, (state, action) => ({ ...state, loading: false, error: '',user:action.userProfile})),
    on(userFailure, (state, { error }) => ({ ...state, loading: false, error: error })),
    on(logoutSuccess, () => initialState)
);
