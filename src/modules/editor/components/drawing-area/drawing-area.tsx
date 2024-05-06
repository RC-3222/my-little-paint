import type { PointerEventHandler, RefObject } from "react"

import styles from "./drawing-area.module.scss"

type DrawingAreaProps = {
    canvasRef: RefObject<HTMLCanvasElement>
    previewRef: RefObject<HTMLCanvasElement>
    onPointerUp: PointerEventHandler
    onPointerMove: PointerEventHandler
    onPointerLeave: PointerEventHandler
    onPointerDown: PointerEventHandler
}

export const DrawingArea = ({
    canvasRef,
    previewRef,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    onPointerMove,
}: DrawingAreaProps) => {
    return (
        <div
            className={styles.container}
            onPointerDown={e => {
                if (e.target === previewRef.current) {
                    onPointerDown(e)
                }
            }}
            onPointerUp={e => {
                if (e.target === previewRef.current) {
                    onPointerUp(e)
                }
            }}
            onPointerLeave={e => {
                if (e.target === previewRef.current) {
                    onPointerLeave(e)
                }
            }}
            onPointerMove={e => {
                if (e.target === previewRef.current) {
                    onPointerMove(e)
                }
            }}
        >
            <canvas
                width={762}
                height={762}
                className={styles.canvas}
                ref={canvasRef}
            ></canvas>
            <canvas
                width={762}
                height={762}
                className={styles.canvas_preview}
                ref={previewRef}
            ></canvas>
        </div>
    )
}
