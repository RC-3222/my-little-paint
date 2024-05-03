import type { PayloadAction } from "@reduxjs/toolkit/react"
import { createSlice } from "@reduxjs/toolkit/react"
import { MAX_BRUSH_SIZE, MIN_BRUSH_SIZE } from "../constants"
import { Circle, Ellipse, Line, Rectangle, Star } from "../model"

export const enum Instruments {
    Brush = "Brush",
    Circle = "Circle",
    Rectangle = "Rectangle",
    Ellipse = "Ellipse",
    Star = "Star",
    Line = "Line",
}

const instrumentsTypesToShapeClasses = {
    [Instruments.Brush]: null,
    [Instruments.Circle]: Circle,
    [Instruments.Rectangle]: Rectangle,
    [Instruments.Ellipse]: Ellipse,
    [Instruments.Star]: Star,
    [Instruments.Line]: Line,
}

export type EditorSliceState = {
    brushSize: number
    currentInstrument: Instruments
    strokeColor: string
    fillColor: string
}

const initialState: EditorSliceState = {
    brushSize: MIN_BRUSH_SIZE,
    currentInstrument: Instruments.Brush,
    strokeColor: "black",
    fillColor: "black",
}

export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: create => ({
        setCurrentInstrument: create.reducer(
            (state, action: PayloadAction<Instruments>) => {
                state.currentInstrument = action.payload
            },
        ),
        setStrokeColor: create.reducer(
            (state, action: PayloadAction<string>) => {
                state.strokeColor = action.payload
            },
        ),
        setFillColor: create.reducer((state, action: PayloadAction<string>) => {
            state.fillColor = action.payload
        }),
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
        selectShapeClass: state =>
            instrumentsTypesToShapeClasses[state.currentInstrument],
        selectStrokeColor: state => state.currentInstrument,
        selectFillColor: state => state.currentInstrument,
    },
})

export const {
    setCurrentInstrument,
    increaseBrushSize,
    decreaseBrushSize,
    setBrushSize,
    setFillColor,
    setStrokeColor,
} = editorSlice.actions

export const {
    selectBrushSize,
    selectShapeClass,
    selectFillColor,
    selectStrokeColor,
    selectCurrentInstrument,
} = editorSlice.selectors
