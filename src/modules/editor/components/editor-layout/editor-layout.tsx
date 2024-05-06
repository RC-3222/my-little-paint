import { StickyHeader } from "@appShared/components/sticky-header/sticky-header"
import { DrawingArea } from "../drawing-area"

import styles from "./editor-layout.module.scss"
import { Button } from "@appShared"
import { InstrumentPanel } from "../instrument-panel/instrument-panel"
import { useCanvas } from "@appModules/editor/hooks"
import { useRef, useState } from "react"
import { SaveImageForm } from "../save-image-form"
import type { CanvasData } from "@appModules/editor/types"
import { useCanvasShortcuts } from "@appModules/editor/hooks/use-canvas-shortcuts"

export const EditorLayout = () => {
    const canvasDataRef = useRef<CanvasData>({ isDrawing: false })

    const mainCanvasRef = useRef<HTMLCanvasElement>(null)
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)

    const { pointerDownHandler, stopDrawingHandler, pointerMoveHandler } =
        useCanvas({ canvasDataRef, mainCanvasRef, previewCanvasRef })

    useCanvasShortcuts({ canvasDataRef, previewCanvasRef })

    const [isSaveFormOpen, setIsSaveFormOpen] = useState(false)

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
