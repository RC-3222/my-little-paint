import { createAsyncThunk } from "@reduxjs/toolkit/react"
import {
    firebaseSignIn,
    firebaseSignOut,
    firebaseSignUp,
} from "../../../firebase/api"
import type { UserCredentials } from "."

export const signOut = createAsyncThunk("auth/signOut", async () => {
    try {
        await firebaseSignOut()
    } catch (err) {
        throw new Error("Sign out error")
    }
})

export const signIn = createAsyncThunk(
    "auth/signIn",
    async ({ email, password }: UserCredentials) => {
        try {
            const response = await firebaseSignIn(email, password)
            return response.user.email as string
        } catch (err) {
            throw new Error("Sign in error")
        }
    },
)

export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ email, password }: UserCredentials) => {
        try {
            const response = await firebaseSignUp(email, password)

            return response.user.email as string
        } catch (err) {
            throw new Error("Sign up error")
        }
    },
)
