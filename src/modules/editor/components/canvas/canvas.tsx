import type { ComponentPropsWithoutRef, RefObject } from "react"

import styles from "./canvas.module.scss"

type CanvasProps = ComponentPropsWithoutRef<"canvas"> & {
    canvasRef: RefObject<HTMLCanvasElement>
    previewRef: RefObject<HTMLCanvasElement>
}

export const Canvas = ({ canvasRef, previewRef, ...props }: CanvasProps) => {
    return (
        <div className={styles.container}>
            <canvas
                {...props}
                width={762}
                height={762}
                className={styles.canvas}
                ref={canvasRef}
            ></canvas>
            <canvas
                {...props}
                width={762}
                height={762}
                className={styles.canvas_preview}
                ref={previewRef}
            ></canvas>
        </div>
    )
}
