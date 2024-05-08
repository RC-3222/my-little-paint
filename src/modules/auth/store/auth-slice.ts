import { createAppSlice } from "@appStore/create-app-slice"
import { signIn, signOut, signUp } from "./thunks"
import { ReqState } from "@appShared/constants"

export interface AuthSliceState {
    user: string | null
    status: ReqState
}

const initialState: AuthSliceState = {
    user: localStorage.getItem("user") ?? null,
    status: ReqState.Idle,
}

export const authSlice = createAppSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // sign out
            .addCase(signOut.pending, state => {
                state.status = ReqState.Pending
            })
            .addCase(signOut.fulfilled, state => {
                state.status = ReqState.Idle
                localStorage.removeItem("user")
                state.user = null
            })
            .addCase(signOut.rejected, (state, action) => {
                state.status = ReqState.Failed
            })
            // sign in
            .addCase(signIn.pending, state => {
                state.status = ReqState.Pending
            })
            .addCase(signIn.fulfilled, (state, action) => {
                localStorage.setItem("user", action.payload)
                state.status = ReqState.Idle
                state.user = action.payload
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = ReqState.Failed
            })
            // sign up
            .addCase(signUp.pending, state => {
                state.status = ReqState.Pending
            })
            .addCase(signUp.fulfilled, (state, action) => {
                localStorage.setItem("user", action.payload)
                state.status = ReqState.Idle
                state.user = action.payload
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = ReqState.Failed
            })
    },
    selectors: {
        selectUser: auth => auth.user,
        selectStatus: auth => auth.status,
    },
})

export const { selectUser, selectStatus } = authSlice.selectors
