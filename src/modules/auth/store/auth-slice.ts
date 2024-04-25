import { createSlice } from "@reduxjs/toolkit"

export interface CounterSliceState {
    user: string | null
}

const initialState: CounterSliceState = {
    user: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: create => ({
        signIn: create.reducer((state, action: { payload: string }) => {
            state.user = action.payload
        }),
        signOut: create.reducer(state => {
            state.user = null
        }),
    }),
    selectors: {
        selectUser: auth => auth.user,
    },
})

export const { signIn, signOut } = authSlice.actions

export const { selectUser } = authSlice.selectors
