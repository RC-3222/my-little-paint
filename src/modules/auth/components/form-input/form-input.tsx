import classNames from "classnames"
import { Input } from "../../../../shared"

import styles from "./form-input.module.scss"
import type { ChangeEventHandler, FocusEventHandler } from "react"

type FormInputProps = {
    type: "text" | "password"
    label: string
    error?: string
    value: string
    onChange: (newValue: string) => void
    validate: (newValue: string) => void
}

export const FormInput = ({
    type,
    label,
    error,
    value,
    onChange,
    validate,
}: FormInputProps) => {
    const inputStyles = classNames({ [styles.input_error]: !!error })

    const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
        onChange(e.target.value)
        validate(e.target.value)
    }

    const inputBlurHandler: FocusEventHandler<HTMLInputElement> = e => {
        validate(e.target.value)
    }

    return (
        <label className={styles.container}>
            <span className={styles.label}>{label}</span>
            <Input
                onBlur={inputBlurHandler}
                onChange={inputChangeHandler}
                value={value}
                className={inputStyles}
                type={type}
            />
            {!!error && <span className={styles.error}>{error}</span>}
        </label>
    )
}
