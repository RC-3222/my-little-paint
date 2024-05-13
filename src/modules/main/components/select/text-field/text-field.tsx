import type { ComponentPropsWithoutRef, ReactNode } from "react"

import styles from "./text-field.module.scss"
import classNames from "classnames"

export type TextFieldProps = Omit<
    ComponentPropsWithoutRef<"input">,
    "value" | "onChange"
> & {
    value: string
    onChange?: (value: string) => void
    label: string
    error?: string
    leftIcon?: ReactNode
    rightIcon?: ReactNode
}

export const TextField = ({
    label,
    disabled,
    error,
    leftIcon,
    rightIcon,
    value,
    onChange,
    ...props
}: TextFieldProps) => {
    const containerClassName = classNames({
        [styles.container]: true,
        [styles.error]: error,
        [styles.disabled]: disabled,
        [props.className as string]: !!props.className,
    })

    const textFieldClassName = classNames({
        [styles.textField]: true,
        [styles["standart"]]: true,
    })

    return (
        <div className={containerClassName}>
            <label className={textFieldClassName}>
                {leftIcon && (
                    <span className={styles.leftIcon}>{leftIcon}</span>
                )}
                <input
                    {...props}
                    value={value}
                    onChange={
                        onChange ? ev => onChange(ev.target.value) : undefined
                    }
                    disabled={disabled}
                    placeholder={props.placeholder ?? ""}
                    className={styles.input}
                />
                <span className={styles.label}>{label}</span>
                {rightIcon && (
                    <span className={styles.rightIcon}>{rightIcon}</span>
                )}
            </label>
            <span className={styles.errorText}>{error}</span>
        </div>
    )
}
