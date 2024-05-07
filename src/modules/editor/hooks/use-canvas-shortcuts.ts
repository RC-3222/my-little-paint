import type { MutableRefObject, RefObject } from "react"
import { useCallback, useEffect } from "react"
import {
    increaseStrokeSize,
    decreaseStrokeSize,
    increaseBrushSize,
    decreaseBrushSize,
    selectShapeClass,
} from "../store"
import { useAppDispatch, useAppSelector } from "@appStore"
import type { CanvasData } from "../types"

type Args = {
    canvasDataRef: MutableRefObject<CanvasData>
    previewCanvasRef: RefObject<HTMLCanvasElement>
}

export const useCanvasShortcuts = ({
    canvasDataRef,
    previewCanvasRef,
}: Args) => {
    const dispatch = useAppDispatch()

    const ShapeClass = useAppSelector(selectShapeClass)

    const cancelDrawing = useCallback(() => {
        canvasDataRef.current = { isDrawing: false }

        const previewElem = previewCanvasRef.current

        if (!previewElem) return

        const previewCtx = previewElem.getContext("2d")

        if (!previewCtx) return

        previewCtx.clearRect(0, 0, previewElem.width, previewElem.height)
    }, [canvasDataRef, previewCanvasRef])

    const hasShapeClass = !!ShapeClass

    useEffect(() => {
        const keyDownHandler = hasShapeClass
            ? (e: KeyboardEvent) => {
                  switch (e.key) {
                      case "+":
                          dispatch(increaseStrokeSize())
                          break
                      case "-":
                          dispatch(decreaseStrokeSize())
                          break
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
}
