import type { PropsWithChildren } from "react"
import { useEffect } from "react"
import { createPortal } from "react-dom"

import classNames from "classnames"

import styles from "./backdrop.module.scss"

type BackdropProps = PropsWithChildren & {
    className?: string
}

export const Backdrop = ({ children, className }: BackdropProps) => {
    useEffect(() => {
        document.body.classList.add(styles.backdropContainer)

        return () => document.body.classList.remove(styles.backdropContainer)
    })

    return createPortal(
        <div className={classNames(styles.backdrop, className)}>
            {children}
        </div>,
        document.body,
    )
}
