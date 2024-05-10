import { ReqState } from "@appShared/constants"
import { createAppSlice } from "@appStore"
import { getData } from "./thunks"
import type { ImageData } from "@appShared/types"
import type { PayloadAction } from "@reduxjs/toolkit"
//import { type Query } from "firebase/firestore";

export interface MainSliceState {
    data: ImageData[]
    status: ReqState
    //currentQuery: Query | null
}

const initialState: MainSliceState = {
    data: [],
    //currentQuery: null,
    status: ReqState.Idle,
}

export const mainSlice = createAppSlice({
    name: "main",
    initialState,
    reducers: create => ({
        deleteImage: create.reducer((state, action: PayloadAction<string>) => {
            state.data = state.data.filter(item => item.id !== action.payload)
        }),
    }),
    extraReducers(builder) {
        builder
            // getting data
            .addCase(getData.pending, state => {
                state.status = ReqState.Pending
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.status = ReqState.Idle
                state.data = action.payload
            })
            .addCase(getData.rejected, state => {
                state.status = ReqState.Failed
            })
    },
    selectors: {
        selectData: state => state.data,
    },
})

export const { deleteImage } = mainSlice.actions

export const { selectData } = mainSlice.selectors
