import { StickyHeader } from "@appShared/components/sticky-header/sticky-header"
import { DrawingArea } from "../drawing-area"

import styles from "./editor-layout.module.scss"
import { Button } from "@appShared"
import { InstrumentPanel } from "../instrument-panel/instrument-panel"
import { useCanvas } from "@appModules/editor/hooks"
import { useState } from "react"
import { SaveImageForm } from "../save-image-form"

export const EditorLayout = () => {
    const {
        mainCanvasRef,
        previewCanvasRef,
        pointerDownHandler,
        stopDrawingHandler,
        pointerMoveHandler,
    } = useCanvas()

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
