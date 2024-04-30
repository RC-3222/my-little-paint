import type { ComponentProps, ForwardedRef } from "react"
import { forwardRef } from "react"

import styles from "./canvas.module.scss"

type CanvasProps = ComponentProps<"canvas">

export const Canvas = forwardRef(
    (props: CanvasProps, ref: ForwardedRef<HTMLCanvasElement>) => {
        return (
            <div className={styles.container}>
                <canvas {...props} className={styles.canvas} ref={ref}></canvas>
            </div>
        )
    },
)
