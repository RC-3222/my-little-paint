import { createAsyncThunk } from "@reduxjs/toolkit/react"
import {
    firebaseCreateUser,
    firebaseSignIn,
    firebaseSignOut,
    firebaseSignUp,
} from "@appFirebase/api"
import type { UserCredentials } from "."
import { FirebaseError } from "firebase/app"
import { createErrorToast, isValidError } from "@appShared/utils"

export const signOut = createAsyncThunk("auth/signOut", async () => {
    try {
        await firebaseSignOut()
    } catch (err) {
        let errorMessage = isValidError(err) ? err.message : "Unknown error"

        createErrorToast(errorMessage, "signOutError")

        throw new Error(errorMessage)
    }
})

export const signIn = createAsyncThunk(
    "auth/signIn",
    async ({ email, password }: UserCredentials) => {
        try {
            const response = await firebaseSignIn(email, password)
            return response.user.email as string
        } catch (err) {
            let errorMessage = isValidError(err) ? err.message : "Unknown error"

            if (err instanceof FirebaseError) {
                if (err.code === "auth/invalid-credential") {
                    errorMessage = "Incorrect email or password"
                } else {
                    errorMessage = "Unknown server error"
                }
            }

            createErrorToast(errorMessage, "signInError")

            throw new Error(errorMessage)
        }
    },
)

export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ email, password }: UserCredentials) => {
        try {
            const response = await firebaseSignUp(email, password)

            await firebaseCreateUser()

            return response.user.email as string
        } catch (err) {
            let errorMessage = isValidError(err) ? err.message : "Unknown error"

            if (err instanceof FirebaseError) {
                if (err.code === "auth/email-already-in-use") {
                    errorMessage = "Provided email is already in use"
                } else {
                    errorMessage = "Unknown server error"
                }
            }

            createErrorToast(errorMessage, "signUpError")

            throw new Error(errorMessage)
        }
    },
)
