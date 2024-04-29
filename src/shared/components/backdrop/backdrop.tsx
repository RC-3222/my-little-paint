import type { PropsWithChildren } from "react"
import { useEffect } from "react"
import { createPortal } from "react-dom"

import styles from "./backdrop.module.scss"

export const Backdrop = ({ children }: PropsWithChildren) => {
    useEffect(() => {
        document.body.classList.add(styles.backdropContainer)

        return () => document.body.classList.remove(styles.backdropContainer)
    })

    return createPortal(
        <div className={styles.backdrop}>{children}</div>,
        document.body,
    )
}
