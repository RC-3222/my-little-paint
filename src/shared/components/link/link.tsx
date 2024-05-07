import type { LinkProps } from "react-router-dom"

import styles from "./link.module.scss"

import classNames from "classnames"

export const Link = ({ className, children, ...props }: LinkProps) => {
    return (
        <Link {...props} className={classNames(styles.link, className)}>
            {children}
        </Link>
    )
}
