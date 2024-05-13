import { firebaseGetImage } from "@appFirebase/api"
import { createErrorToast } from "@appShared/utils"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getImageData = createAsyncThunk(
    "editor/getImageData",
    async (id: string) => {
        try {
            const data = await firebaseGetImage(id)

            return data
        } catch (err) {
            let errorMessage = "Unknown error"

            console.log(err)
            createErrorToast(errorMessage, "dataGettingError")

            throw new Error(errorMessage)
        }
    },
)
