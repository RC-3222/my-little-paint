import classNames from "classnames"
import type { ComponentPropsWithoutRef } from "react"
import styles from "./button.module.scss"

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    variant?: "primary" | "secondary"
}

export const Button = ({
    children,
    className,
    variant = "primary",
    ...props
}: ButtonProps) => {
    const buttonStyles = classNames(styles.button, styles[variant], className)

    return (
        <button {...props} className={buttonStyles}>
            {children}
        </button>
    )
}
