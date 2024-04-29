import { createAsyncThunk } from "@reduxjs/toolkit/react"
import {
    firebaseSignIn,
    firebaseSignOut,
    firebaseSignUp,
} from "@appFirebase/api"
import type { UserCredentials } from "."
import { toast } from "react-toastify"
import { FirebaseError } from "firebase/app"
import { TOAST_TIMEOUT } from "@appShared/constants"

export const signOut = createAsyncThunk("auth/signOut", async () => {
    try {
        await firebaseSignOut()
    } catch (err) {
        let errorMessage = "Unknown error"

        const toastId = "signOutError"

        toast.error(errorMessage, {
            position: "bottom-right",
            autoClose: TOAST_TIMEOUT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: toastId,
            updateId: toastId,
        })

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
            let errorMassage = "Unknown error"

            if (err instanceof FirebaseError) {
                if (err.code === "auth/invalid-credential") {
                    errorMassage = "Incorrect email or password"
                } else {
                    errorMassage = "Unknown server error"
                }
            }

            const toastId = "signInError"

            toast.error(errorMassage, {
                position: "bottom-right",
                autoClose: TOAST_TIMEOUT,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: toastId,
                updateId: toastId,
            })

            throw new Error(errorMassage)
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
            let errorMassage = "Unknown error"

            if (err instanceof FirebaseError) {
                if (err.code === "auth/email-already-in-use") {
                    errorMassage = "Provided email is already in use"
                } else {
                    errorMassage = "Unknown server error"
                }
            }

            const toastId = "signUpError"

            toast.error(errorMassage, {
                position: "bottom-right",
                autoClose: TOAST_TIMEOUT,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: toastId,
                updateId: toastId,
            })

            throw new Error(errorMassage)
        }
    },
)
