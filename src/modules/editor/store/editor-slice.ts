import type { PayloadAction } from "@reduxjs/toolkit/react"
import { createSlice } from "@reduxjs/toolkit/react"
import { MAX_BRUSH_SIZE, MIN_BRUSH_SIZE } from "../constants"

export const enum Instruments {
    Brush = "Brush",
    Circle = "Circle",
    Rectangle = "Rectangle",
}

export type EditorSliceState = {
    brushSize: number
    currentInstrument: Instruments
}

const initialState: EditorSliceState = {
    brushSize: MIN_BRUSH_SIZE,
    currentInstrument: Instruments.Brush,
}

export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: create => ({
        setInstrument: create.reducer(
            (state, action: PayloadAction<Instruments>) => {
                state.currentInstrument = action.payload
            },
        ),
        increaseBrushSize: create.reducer(state => {
            state.brushSize = Math.min(MAX_BRUSH_SIZE, state.brushSize + 0.5)
        }),
        decreaseBrushSize: create.reducer(state => {
            state.brushSize = Math.max(MIN_BRUSH_SIZE, state.brushSize - 0.5)
        }),
        setBrushSize: create.reducer((state, action: PayloadAction<number>) => {
            state.brushSize = Math.max(
                MIN_BRUSH_SIZE,
                Math.min(MAX_BRUSH_SIZE, action.payload),
            )
        }),
    }),
    selectors: {
        selectBrushSize: state => state.brushSize,
        selectCurrentInstrument: state => state.currentInstrument,
    },
})

export const {
    setInstrument,
    increaseBrushSize,
    decreaseBrushSize,
    setBrushSize,
} = editorSlice.actions

export const { selectBrushSize, selectCurrentInstrument } =
    editorSlice.selectors
