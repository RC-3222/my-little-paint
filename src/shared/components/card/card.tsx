import type { ComponentPropsWithoutRef } from "react"

import styles from "./card.module.scss"
import classNames from "classnames"

type CardProps = ComponentPropsWithoutRef<"div">

export const Card = ({ children, className, ...props }: CardProps) => {
    const cardStyles = classNames(styles.card, {
        [className as string]: !!className,
    })

    return (
        <div {...props} className={cardStyles}>
            {children}
        </div>
    )
}
