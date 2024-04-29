import { createAppSlice } from "@appStore/create-app-slice"
import { signIn, signOut, signUp } from "./thunks"

export const enum AuthReqState {
    Pending = "Pending",
    Idle = "Idle",
    Failed = "Failed",
}

export interface AuthSliceState {
    user: string | null
    status: AuthReqState
}

const initialState: AuthSliceState = {
    user: localStorage.getItem("user") ?? null,
    status: AuthReqState.Idle,
}

export const authSlice = createAppSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // sign out
            .addCase(signOut.pending, state => {
                state.status = AuthReqState.Pending
            })
            .addCase(signOut.fulfilled, state => {
                state.status = AuthReqState.Idle
                localStorage.removeItem("user")
                state.user = null
            })
            .addCase(signOut.rejected, (state, action) => {
                state.status = AuthReqState.Failed
            })
            // sign in
            .addCase(signIn.pending, state => {
                state.status = AuthReqState.Pending
            })
            .addCase(signIn.fulfilled, (state, action) => {
                localStorage.setItem("user", action.payload)
                state.status = AuthReqState.Idle
                state.user = action.payload
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = AuthReqState.Failed
            })
            // sign up
            .addCase(signUp.pending, state => {
                state.status = AuthReqState.Pending
            })
            .addCase(signUp.fulfilled, (state, action) => {
                localStorage.setItem("user", action.payload)
                state.status = AuthReqState.Idle
                state.user = action.payload
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = AuthReqState.Failed
            })
    },
    selectors: {
        selectUser: auth => auth.user,
        selectStatus: auth => auth.status,
    },
})

export const { selectUser, selectStatus } = authSlice.selectors
