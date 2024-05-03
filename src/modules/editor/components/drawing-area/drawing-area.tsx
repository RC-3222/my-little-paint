import { Canvas } from "../canvas"

import styles from "./drawing-area.module.scss"
import { useCanvas } from "@appModules/editor/hooks"

export const DrawingArea = () => {
    const {
        mainCanvasRef,
        previewCanvasRef,
        mouseDownHandler,
        stopDrawingHandler,
        mouseMoveHandler,
    } = useCanvas()

    return (
        <div className={styles.container}>
            <Canvas
                canvasRef={mainCanvasRef}
                previewRef={previewCanvasRef}
                onMouseDown={mouseDownHandler}
                onMouseUp={stopDrawingHandler}
                onMouseMove={mouseMoveHandler}
                onMouseLeave={stopDrawingHandler}
            />
        </div>
    )
}
