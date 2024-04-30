import { Canvas } from "../canvas"
import { draw, getCursorPosition } from "../../utils"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@appStore"
import {
    decreaseBrushSize,
    increaseBrushSize,
    selectBrushSize,
} from "@appModules/editor/store"

type CanvasData = {
    previousX?: number
    previousY?: number
}

export const DrawingArea = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [isDrawing, setIsDrawing] = useState(false)
    const canvData = useRef<CanvasData>({})

    const dispatch = useAppDispatch()
    const brushSize = useAppSelector(selectBrushSize)

    useEffect(() => {
        canvasRef.current?.getContext("2d")?.translate(0.5, 0.5)
    }, [canvasRef.current])

    const mouseDownHandler = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    ) => {
        const canvasElem = canvasRef.current
        if (!canvasElem) return

        const ctx = canvasElem.getContext("2d")

        const { x, y } = getCursorPosition(e, canvasElem)

        draw({
            currentX: x,
            currentY: y,
            context: ctx,
            brushColor: `hsl(${x} 100 50)`,
            brushSize,
        })

        canvData.current.previousX = x
        canvData.current.previousY = y

        setIsDrawing(true)
    }

    const stopDrawingHandler = () => {
        setIsDrawing(false)
        canvData.current = {}
    }

    const mouseMoveHandler = (
        e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    ) => {
        const canvasElem = canvasRef.current

        if (!canvasElem || !isDrawing) return

        const ctx = canvasElem.getContext("2d")

        const { x, y } = getCursorPosition(e, canvasElem)

        const { previousX, previousY } = canvData.current

        draw({
            previousX,
            previousY,
            currentX: x,
            currentY: y,
            context: ctx,
            brushColor: `hsl(${x} 100 50)`,
            brushSize,
        })

        canvData.current.previousX = x
        canvData.current.previousY = y
    }

    useEffect(() => {
        const keyDownHandler = (e: any) => {
            switch (e.key) {
                case "+":
                    dispatch(increaseBrushSize())
                    break
                case "-":
                    dispatch(decreaseBrushSize())
                    break
                default:
                    return
            }
        }

        window.addEventListener("keydown", keyDownHandler)

        return () => window.removeEventListener("keydown", keyDownHandler)
    }, [])

    return (
        <div>
            <Canvas
                ref={canvasRef}
                onMouseDown={mouseDownHandler}
                onMouseUp={stopDrawingHandler}
                onMouseLeave={stopDrawingHandler}
                onMouseMove={mouseMoveHandler}
            />
        </div>
    )
}
