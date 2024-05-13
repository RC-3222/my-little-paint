import { StickyHeader } from "@appShared/components/sticky-header/sticky-header"
import { DrawingArea } from "../drawing-area"

import styles from "./editor-layout.module.scss"
import { Button } from "@appShared/components"
import { InstrumentPanel } from "../instrument-panel/instrument-panel"
import { useCanvas, useCanvasImageData } from "@appModules/editor/hooks"
import { useEffect, useRef, useState } from "react"
import { SaveImageForm } from "../save-image-form"
import type { CanvasData } from "@appModules/editor/types"
import { useCanvasShortcuts } from "@appModules/editor/hooks/use-canvas-shortcuts"
import { useSearchParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@appStore"
import { getImageData } from "@appModules/editor/store/thunks"
import {
    selectCurrentImageData,
    setCurrentImageData,
} from "@appModules/editor/store"

export const EditorLayout = () => {
    const canvasDataRef = useRef<CanvasData>({ isDrawing: false })

    const mainCanvasRef = useRef<HTMLCanvasElement>(null)
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)

    const { pointerDownHandler, stopDrawingHandler, pointerMoveHandler } =
        useCanvas({ canvasDataRef, mainCanvasRef, previewCanvasRef })

    useCanvasShortcuts({ canvasDataRef, previewCanvasRef })
    useCanvasImageData({ mainCanvasRef })

    const [isSaveFormOpen, setIsSaveFormOpen] = useState(false)

    const dispatch = useAppDispatch()

    const currentImageData = useAppSelector(selectCurrentImageData)

    const [urlParams, setUrlSearchParams] = useSearchParams()

    const restartHandler = () => {
        setUrlSearchParams({})
        dispatch(setCurrentImageData(null))
        if (mainCanvasRef.current)
            mainCanvasRef.current
                .getContext("2d")
                ?.clearRect(
                    0,
                    0,
                    mainCanvasRef.current.width,
                    mainCanvasRef.current.height,
                )
    }

    const imageId = urlParams.get("imageId")

    useEffect(() => {
        if (imageId && imageId !== currentImageData?.id) {
            dispatch(getImageData(imageId))
        }
        //firebaseGetUsers().then((data)=>console.log(data)).catch(err=>console.error(err))
    }, [currentImageData?.id, dispatch, imageId])

    useEffect(() => {
        return () => {
            dispatch(setCurrentImageData(null))
        }
    }, [dispatch])

    return (
        <>
            <StickyHeader className={styles.header}>
                <h2 className={styles.title}>Editor</h2>
                <Button
                    variant={"secondary"}
                    onClick={() => setIsSaveFormOpen(true)}
                >
                    Save
                </Button>
                <Button variant={"secondary"} onClick={restartHandler}>
                    restart
                </Button>
            </StickyHeader>
            <InstrumentPanel />
            <main className={styles.main}>
                <DrawingArea
                    canvasRef={mainCanvasRef}
                    previewRef={previewCanvasRef}
                    onPointerDown={pointerDownHandler}
                    onPointerMove={pointerMoveHandler}
                    onPointerUp={stopDrawingHandler}
                    onPointerLeave={stopDrawingHandler}
                />
            </main>
            {isSaveFormOpen && (
                <SaveImageForm
                    onClose={() => setIsSaveFormOpen(false)}
                    canvasRef={mainCanvasRef}
                />
            )}
        </>
    )
}
