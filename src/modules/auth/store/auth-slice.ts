import { createSlice } from "@reduxjs/toolkit"

export interface CounterSliceState {
    user: string | null
}

const initialState: CounterSliceState = {
    user: localStorage.getItem("user") ?? null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: create => ({
        signIn: create.reducer((state, action: { payload: string }) => {
            localStorage.setItem("user", action.payload)
            state.user = action.payload
        }),
        signOut: create.reducer(state => {
            localStorage.removeItem("user")
            state.user = null
        }),
    }),
    selectors: {
        selectUser: auth => auth.user,
    },
})

export const { signIn, signOut } = authSlice.actions

export const { selectUser } = authSlice.selectors
