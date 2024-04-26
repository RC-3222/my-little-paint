import classNames from "classnames"
import { Input } from "../../../../shared"

import styles from "./form-input.module.scss"
import type { FieldError, UseFormRegister } from "react-hook-form"
import type { FormSchemaType } from "../../schemas"

type FormInputProps = {
    type: "text" | "password"
    label: string
    error?: FieldError
    register: UseFormRegister<FormSchemaType>
    name: keyof FormSchemaType
}

export const FormInput = ({
    type,
    label,
    error,
    name,
    register,
}: FormInputProps) => {
    const inputStyles = classNames({ [styles.input_error]: !!error })

    return (
        <label className={styles.container}>
            <span className={styles.label}>{label}</span>
            <Input
                className={inputStyles}
                type={type}
                {...register(name, { pattern: /d+/ })}
            />
            {!!error && <span className={styles.error}>{error.message}</span>}
        </label>
    )
}
