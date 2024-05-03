import { useAppDispatch, useAppSelector } from "@appStore"
import type { MouseEventHandler } from "react"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { drawBrush, getCursorPosition } from "../utils"
import {
    increaseBrushSize,
    decreaseBrushSize,
    selectShapeClass,
    selectBrushSize,
    selectFillColor,
    selectStrokeColor,
} from "../store"
import { drawShape } from "../utils/drawing"

type CanvasData = {
    startX?: number
    startY?: number
    currentX?: number
    currentY?: number
    isDrawing: boolean
}

export const useCanvas = () => {
    const mainCanvasRef = useRef<HTMLCanvasElement>(null)
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)

    const canvData = useRef<CanvasData>({ isDrawing: false })

    const ShapeClass = useAppSelector(selectShapeClass)
    const brushSize = useAppSelector(selectBrushSize)
    const fillColor = useAppSelector(selectFillColor)
    const strokeColor = useAppSelector(selectStrokeColor)

    const dispatch = useAppDispatch()

    const hasShapeClass = !!ShapeClass

    const mouseDownHandler = useMemo<
        MouseEventHandler<HTMLCanvasElement>
    >(() => {
        if (!hasShapeClass) {
            return e => {
                const canvasElem = mainCanvasRef.current
                if (!canvasElem) return
                const context = canvasElem.getContext("2d")
                const { x, y } = getCursorPosition(e, canvasElem)
                drawBrush({
                    currentX: x,
                    currentY: y,
                    context,
                    brushColor: fillColor,
                    brushSize,
                })
                canvData.current.startX = x
                canvData.current.startY = y

                canvData.current.isDrawing = true
            }
        } else {
            return e => {
                const canvasElem = mainCanvasRef.current
                const previewElem = previewCanvasRef.current

                if (!canvasElem || !previewElem) return

                const { x, y } = getCursorPosition(e, canvasElem)

                canvData.current.startX = x
                canvData.current.startY = y

                canvData.current.isDrawing = true
            }
        }
    }, [hasShapeClass, fillColor, brushSize])

    const cancelDrawing = useCallback(() => {
        canvData.current = { isDrawing: false }

        const previewElem = previewCanvasRef.current

        if (!previewElem) return

        const previewCtx = previewElem.getContext("2d")

        if (!previewCtx) return

        previewCtx.clearRect(0, 0, previewElem.width, previewElem.height)
    }, [])

    const stopDrawingHandler = useMemo<
        MouseEventHandler<HTMLCanvasElement>
    >(() => {
        if (!ShapeClass) {
            return e => {
                if (canvData.current.isDrawing)
                    canvData.current = { isDrawing: false }
            }
        } else {
            return e => {
                if (canvData.current.isDrawing) {
                    const { startX, startY } = canvData.current

                    canvData.current = { isDrawing: false }

                    const canvasElem = mainCanvasRef.current
                    const previewElem = previewCanvasRef.current

                    if (
                        !canvasElem ||
                        !previewElem ||
                        startX == null ||
                        startY == null
                    )
                        return

                    const canvasCtx = canvasElem.getContext("2d")
                    const previewCtx = previewElem.getContext("2d")

                    if (!canvasCtx || !previewCtx) return

                    previewCtx.clearRect(
                        0,
                        0,
                        previewElem.width,
                        previewElem.height,
                    )

                    const { x, y } = getCursorPosition(e, canvasElem)

                    drawShape({
                        startX,
                        startY,
                        currentX: x,
                        currentY: y,
                        context: canvasCtx,
                        strokeColor,
                        fillColor,
                        ShapeClass,
                    })
                }
            }
        }
    }, [ShapeClass, fillColor, strokeColor])

    const mouseMoveHandler = useMemo<
        MouseEventHandler<HTMLCanvasElement>
    >(() => {
        if (!ShapeClass) {
            return e => {
                if (!canvData.current.isDrawing) return

                const canvasElem = mainCanvasRef.current
                if (!canvasElem) return

                const context = canvasElem.getContext("2d")

                if (!context) return

                const { x, y } = getCursorPosition(e, canvasElem)

                const { startX, startY } = canvData.current

                drawBrush({
                    startX,
                    startY,
                    currentX: x,
                    currentY: y,
                    context,
                    brushColor: fillColor,
                    brushSize,
                })

                canvData.current.startX = x
                canvData.current.startY = y
            }
        } else {
            return e => {
                if (!canvData.current.isDrawing) return

                const canvasElem = mainCanvasRef.current
                const previewElem = previewCanvasRef.current

                if (!canvasElem || !previewElem) return

                const previewCtx = previewElem.getContext("2d")

                if (!previewCtx) return

                const { x, y } = getCursorPosition(e, previewElem)

                const { startX, startY } = canvData.current

                if (startX == null || startY == null) return

                previewCtx.clearRect(
                    0,
                    0,
                    previewElem.width,
                    previewElem.height,
                )

                drawShape({
                    startX,
                    startY,
                    currentX: x,
                    currentY: y,
                    context: previewCtx,
                    strokeColor,
                    fillColor,
                    ShapeClass,
                })

                canvData.current.currentX = x
                canvData.current.currentY = y
            }
        }
    }, [ShapeClass, strokeColor, fillColor, brushSize])

    useEffect(() => {
        const keyDownHandler = hasShapeClass
            ? (e: KeyboardEvent) => {
                  switch (e.key) {
                      case "Backspace":
                          cancelDrawing()
                          break
                      default:
                          return
                  }
              }
            : (e: KeyboardEvent) => {
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
    }, [hasShapeClass, cancelDrawing, dispatch])

    return {
        mainCanvasRef,
        previewCanvasRef,
        mouseDownHandler,
        mouseMoveHandler,
        stopDrawingHandler,
    }
}
