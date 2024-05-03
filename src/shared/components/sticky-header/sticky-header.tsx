import classNames from "classnames"
import type { ComponentPropsWithoutRef } from "react"

import styles from "./sticky-header.module.scss"

type StickyHeaderProps = ComponentPropsWithoutRef<"header">

export const StickyHeader = ({
    className,
    children,
    ...props
}: StickyHeaderProps) => {
    return (
        <header {...props} className={classNames(styles.header, className)}>
            {children}
        </header>
    )
}
