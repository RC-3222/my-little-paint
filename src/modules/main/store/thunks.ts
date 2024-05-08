import { firebaseGetData } from "@appFirebase/api"
import type { ImageData } from "@appShared/types"
import { createErrorToast } from "@appShared/utils"
import { createAsyncThunk } from "@reduxjs/toolkit/react"

export const getData = createAsyncThunk(
    "main/getData",
    async (email?: string) => {
        try {
            const data = await firebaseGetData(email)

            return data as ImageData[]
        } catch (err) {
            let errorMessage = "Unknown error"

            console.log(err)
            createErrorToast(errorMessage, "dataGettingError")

            throw new Error(errorMessage)
        }
    },
)
