import { firebaseGetData } from "@appFirebase/api"
//import type { ImageData } from "@appShared/types"
import { createErrorToast } from "@appShared/utils"
import { createAsyncThunk } from "@reduxjs/toolkit/react"

type GetDataArgs = {
    email?: string
    pageNum?: number
}

export const getData = createAsyncThunk(
    "main/getData",
    async ({ email, pageNum }: GetDataArgs) => {
        try {
            const resData = await firebaseGetData(email, pageNum)

            const { data, pageCount } = resData

            console.log(resData)

            return { data, pageCount }
        } catch (err) {
            let errorMessage = "Unknown error"

            console.log(err)
            createErrorToast(errorMessage, "dataGettingError")

            throw new Error(errorMessage)
        }
    },
)
