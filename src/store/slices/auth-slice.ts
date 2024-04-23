import { createSlice } from "@reduxjs/toolkit"

export interface CounterSliceState {
  isAuthorized: boolean
}

const initialState: CounterSliceState = {
  isAuthorized: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    signIn: create.reducer(state => {
      state.isAuthorized = true
    }),
    signOut: create.reducer(state => {
      state.isAuthorized = false
    }),
  }),
  selectors: {
    selectIsAuthorized: auth => auth.isAuthorized,
  },
})

export const { signIn, signOut } = authSlice.actions

export const { selectIsAuthorized } = authSlice.selectors
