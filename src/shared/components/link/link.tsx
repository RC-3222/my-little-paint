import { type LinkProps, Link as RouterLink } from "react-router-dom"

import styles from "./link.module.scss"

import classNames from "classnames"

export const Link = ({ className, children, ...props }: LinkProps) => {
    return (
        <RouterLink {...props} className={classNames(styles.link, className)}>
            {children}
        </RouterLink>
    )
}
