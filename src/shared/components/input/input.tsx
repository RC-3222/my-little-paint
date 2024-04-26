import classNames from "classnames"
import { forwardRef, type ComponentProps } from "react"

import styles from "./input.module.scss"

type InputProps = Omit<ComponentProps<"input">, "type" | "checked"> & {
    type: "text" | "password"
}

export const Input = forwardRef(
    (
        { className, type = "text", ...props }: InputProps,
        ref: React.ForwardedRef<HTMLInputElement>,
    ) => {
        return (
            <input
                {...props}
                ref={ref}
                type={type}
                className={classNames(styles.input, className)}
            />
        )
    },
)
