import classNames from "classnames"
import type { ComponentPropsWithoutRef } from "react"

import styles from "./input.module.scss"

type InputProps = Omit<
    ComponentPropsWithoutRef<"input">,
    "type" | "checked"
> & {
    type: "text" | "password"
}

export const Input = ({ className, type = "text", ...props }: InputProps) => {
    return (
        <input
            {...props}
            type={type}
            className={classNames(styles.input, className)}
        />
    )
}
