import classNames from "classnames"
import type { ComponentPropsWithoutRef } from "react"
import styles from "./button.module.scss"

type ButtonProps = ComponentPropsWithoutRef<"button">

export const Button = ({ children, className, ...props }: ButtonProps) => {
    const buttonStyles = classNames(styles.button, {
        [className as string]: className,
    })

    return (
        <button {...props} className={buttonStyles}>
            {children}
        </button>
    )
}
