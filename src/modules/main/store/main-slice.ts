import { ReqState } from "@appShared/constants"
import { createAppSlice } from "@appStore"
import { getData } from "./thunks"
import type { ImageData } from "@appShared/types"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface MainSliceState {
    data: ImageData[]
    reqStatus: ReqState
}

const initialState: MainSliceState = {
    data: [],
    reqStatus: ReqState.Idle,
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
            .addCase(getData.pending, state => {
                state.reqStatus = ReqState.Pending
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.reqStatus = ReqState.Idle
                state.data = action.payload
            })
            .addCase(getData.rejected, state => {
                state.reqStatus = ReqState.Failed
            })
    },
    selectors: {
        selectData: state => state.data,
        selectRequestStatus: state => state.reqStatus,
    },
})

export const { deleteImage } = mainSlice.actions

export const { selectData, selectRequestStatus } = mainSlice.selectors
