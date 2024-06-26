import {
    MIN_BRUSH_SIZE,
    MAX_BRUSH_SIZE,
    MIN_STROKE_SIZE,
    MAX_STROKE_SIZE,
} from "@appModules/editor/constants"
import {
    selectFillColor,
    selectStrokeColor,
    selectStrokeSize,
    selectBrushSize,
    setFillColor,
    setStrokeColor,
    setBrushSize,
    setStrokeSize,
    selectCurrentInstrument,
    Instruments,
} from "@appModules/editor/store"
import { useAppDispatch, useAppSelector } from "@appStore"

import styles from "./instrument-params.module.scss"
import { ColorPicker } from "../../../../shared/components/color-picker"
import { NumberInput } from "../../../../shared/components/number-input"

export const InstrumentParams = () => {
    const currentInstrument = useAppSelector(selectCurrentInstrument)

    const dispatch = useAppDispatch()

    const fillColor = useAppSelector(selectFillColor)
    const strokeColor = useAppSelector(selectStrokeColor)
    const strokeSize = useAppSelector(selectStrokeSize)
    const brushSize = useAppSelector(selectBrushSize)

    return (
        <div className={styles.instrumentParams}>
            <h3 className={styles.title}>Instrument Params</h3>
            <div className={styles.paramContainer}>
                {currentInstrument !== Instruments.Line && (
                    <ColorPicker
                        className={styles.param}
                        label={
                            currentInstrument === Instruments.Brush
                                ? "Brush color:"
                                : "Fill color:"
                        }
                        value={fillColor}
                        onChange={e => {
                            dispatch(setFillColor(e.target.value))
                        }}
                    />
                )}
                {currentInstrument !== Instruments.Brush && (
                    <ColorPicker
                        className={styles.param}
                        label="Stroke color:"
                        value={strokeColor}
                        onChange={e => {
                            dispatch(setStrokeColor(e.target.value))
                        }}
                    />
                )}
                {currentInstrument === Instruments.Brush ? (
                    <NumberInput
                        className={styles.param}
                        label="Brush size:"
                        value={brushSize}
                        step="0.5"
                        onChange={e => dispatch(setBrushSize(+e.target.value))}
                        min={MIN_BRUSH_SIZE}
                        max={MAX_BRUSH_SIZE}
                    />
                ) : (
                    <NumberInput
                        className={styles.param}
                        label={
                            currentInstrument === Instruments.Line
                                ? "Line width:"
                                : "Stroke size:"
                        }
                        value={strokeSize}
                        step="0.5"
                        onChange={e => {
                            dispatch(setStrokeSize(+e.target.value))
                        }}
                        min={MIN_STROKE_SIZE}
                        max={MAX_STROKE_SIZE}
                    />
                )}
            </div>
        </div>
    )
}
