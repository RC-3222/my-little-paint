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
    const pointerEventHandler: PointerEventHandler = e => {
        if (e.target !== previewRef.current) return

        switch (e.type) {
            case "pointerdown": {
                onPointerDown(e)
                break
            }
            case "pointermove": {
                onPointerMove(e)
                break
            }
            case "pointerup": {
                onPointerUp(e)
                break
            }
            case "pointerleave": {
                onPointerLeave(e)
                break
            }
            default:
                return
        }
    }

    return (
        <div
            className={styles.container}
            onPointerDown={pointerEventHandler}
            onPointerUp={pointerEventHandler}
            onPointerLeave={pointerEventHandler}
            onPointerMove={pointerEventHandler}
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
