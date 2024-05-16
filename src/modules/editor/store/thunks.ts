import { firebaseGetImage } from "@appFirebase/api"
import { createErrorToast, isValidError } from "@appShared/utils"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getImageData = createAsyncThunk(
    "editor/getImageData",
    async (id: string) => {
        try {
            const data = await firebaseGetImage(id)

            return data
        } catch (err) {
            let errorMessage = isValidError(err) ? err.message : "Unknown error"

            console.error(err)
            createErrorToast(errorMessage, "dataGettingError")

            throw new Error(errorMessage)
        }
    },
)
