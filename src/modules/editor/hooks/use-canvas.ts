import { useAppSelector } from "@appStore"
import type { PointerEventHandler, MutableRefObject, RefObject } from "react"
import { useCallback } from "react"
import { drawBrush, drawShape, getPointerPosition } from "../utils"
import {
    selectShapeClass,
    selectBrushSize,
    selectFillColor,
    selectStrokeColor,
    selectStrokeSize,
} from "../store"

import type { CanvasData } from "../types"

type Args = {
    canvasDataRef: MutableRefObject<CanvasData>
    mainCanvasRef: RefObject<HTMLCanvasElement>
    previewCanvasRef: RefObject<HTMLCanvasElement>
}

export const useCanvas = ({
    canvasDataRef,
    mainCanvasRef,
    previewCanvasRef,
}: Args) => {
    const ShapeClass = useAppSelector(selectShapeClass)
    const brushSize = useAppSelector(selectBrushSize)
    const fillColor = useAppSelector(selectFillColor)
    const strokeColor = useAppSelector(selectStrokeColor)
    const strokeSize = useAppSelector(selectStrokeSize)

    const hasShapeClass = !!ShapeClass

    const pointerDownBrushHandler = useCallback<
        PointerEventHandler<HTMLCanvasElement>
    >(
        e => {
            const canvasElem = mainCanvasRef.current
            if (!canvasElem) return
            const context = canvasElem.getContext("2d")
            const { x, y } = getPointerPosition(e, canvasElem)
            drawBrush({
                currentX: x,
                currentY: y,
                context,
                brushColor: fillColor,
                brushSize,
            })
            canvasDataRef.current.startX = x
            canvasDataRef.current.startY = y

            canvasDataRef.current.isDrawing = true
        },
        [brushSize, canvasDataRef, fillColor, mainCanvasRef],
    )

    const pointerDownShapeHandler = useCallback<
        PointerEventHandler<HTMLCanvasElement>
    >(
        e => {
            const canvasElem = mainCanvasRef.current
            const previewElem = previewCanvasRef.current

            if (!canvasElem || !previewElem) return

            const { x, y } = getPointerPosition(e, canvasElem)

            canvasDataRef.current.startX = x
            canvasDataRef.current.startY = y

            canvasDataRef.current.isDrawing = true
        },
        [canvasDataRef, mainCanvasRef, previewCanvasRef],
    )

    const stopDrawingBrushHandler = useCallback<
        PointerEventHandler<HTMLCanvasElement>
    >(
        e => {
            if (canvasDataRef.current.isDrawing)
                canvasDataRef.current = { isDrawing: false }
        },
        [canvasDataRef],
    )

    const stopDrawingShapeHandler = useCallback<
        PointerEventHandler<HTMLCanvasElement>
    >(
        e => {
            if (ShapeClass === null) return

            if (canvasDataRef.current.isDrawing) {
                const { startX, startY } = canvasDataRef.current

                canvasDataRef.current = { isDrawing: false }

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

                const { x, y } = getPointerPosition(e, canvasElem)

                drawShape({
                    startX,
                    startY,
                    currentX: x,
                    currentY: y,
                    context: canvasCtx,
                    strokeColor,
                    strokeSize,
                    fillColor,
                    ShapeClass,
                })
            }
        },
        [
            ShapeClass,
            canvasDataRef,
            fillColor,
            mainCanvasRef,
            previewCanvasRef,
            strokeColor,
            strokeSize,
        ],
    )

    const pointerMoveShapeHandler = useCallback<
        PointerEventHandler<HTMLCanvasElement>
    >(
        e => {
            if (!ShapeClass) return
            if (!canvasDataRef.current.isDrawing) return

            const canvasElem = mainCanvasRef.current
            const previewElem = previewCanvasRef.current

            if (!canvasElem || !previewElem) return

            const previewCtx = previewElem.getContext("2d")

            if (!previewCtx) return

            const { x, y } = getPointerPosition(e, previewElem)

            const { startX, startY } = canvasDataRef.current

            if (startX == null || startY == null) return

            previewCtx.clearRect(0, 0, previewElem.width, previewElem.height)

            drawShape({
                startX,
                startY,
                currentX: x,
                currentY: y,
                context: previewCtx,
                strokeColor,
                fillColor,
                strokeSize,
                ShapeClass,
            })

            canvasDataRef.current.currentX = x
            canvasDataRef.current.currentY = y
        },
        [
            ShapeClass,
            canvasDataRef,
            fillColor,
            mainCanvasRef,
            previewCanvasRef,
            strokeColor,
            strokeSize,
        ],
    )

    const pointerMoveBrushHandler = useCallback<
        PointerEventHandler<HTMLCanvasElement>
    >(
        e => {
            if (!canvasDataRef.current.isDrawing) return

            const canvasElem = mainCanvasRef.current
            if (!canvasElem) return

            const context = canvasElem.getContext("2d")

            if (!context) return

            const { x, y } = getPointerPosition(e, canvasElem)

            const { startX, startY } = canvasDataRef.current

            drawBrush({
                startX,
                startY,
                currentX: x,
                currentY: y,
                context,
                brushColor: fillColor,
                brushSize,
            })

            canvasDataRef.current.startX = x
            canvasDataRef.current.startY = y
        },
        [brushSize, canvasDataRef, fillColor, mainCanvasRef],
    )

    return {
        pointerDownHandler: hasShapeClass
            ? pointerDownShapeHandler
            : pointerDownBrushHandler,
        pointerMoveHandler: hasShapeClass
            ? pointerMoveShapeHandler
            : pointerMoveBrushHandler,
        stopDrawingHandler: hasShapeClass
            ? stopDrawingShapeHandler
            : stopDrawingBrushHandler,
    }
}
