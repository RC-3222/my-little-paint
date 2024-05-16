import type { QueryDirections } from "@appFirebase/api"
import { firebaseGetData } from "@appFirebase/api"
//import type { ImageData } from "@appShared/types"
import { isValidError, createErrorToast } from "@appShared/utils"
import { createAsyncThunk } from "@reduxjs/toolkit/react"

type GetDataArgs = {
    email: string | null
    docId: string | null
    queryDirection: QueryDirections | null
}

export const getData = createAsyncThunk(
    "main/getData",
    async (args: GetDataArgs) => {
        try {
            const resData = await firebaseGetData(args)

            return resData
        } catch (err) {
            let errorMessage = isValidError(err) ? err.message : "Unknown error"

            console.error(err)
            createErrorToast(errorMessage, "dataGettingError")

            throw new Error(errorMessage)
        }
    },
)
