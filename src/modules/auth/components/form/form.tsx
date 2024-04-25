import type { ComponentPropsWithoutRef } from "react"
import classNames from "classnames"

import styles from "./form.module.scss"

type FormProps = ComponentPropsWithoutRef<"form">

export const Form = ({ children, className, ...props }: FormProps) => {
    const formStyles = classNames(styles.form, {
        [className as string]: !!className,
    })
    return (
        <form {...props} className={formStyles}>
            {children}
        </form>
    )
}
