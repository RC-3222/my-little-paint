import classNames from "classnames"
import { Input } from "@appShared/components"

import styles from "./form-input.module.scss"
import { useFormContext } from "react-hook-form"

type FormInputProps = {
    type: "text" | "password"
    label: string
    name: string
}

export const FormInput = ({ type, label, name }: FormInputProps) => {
    const {
        register,
        formState: { errors, defaultValues },
    } = useFormContext()

    const inputStyles = classNames({ [styles.input_error]: !!errors[name] })

    return (
        <label className={styles.container}>
            <span className={styles.label}>{label}</span>
            <Input
                defaultValue={defaultValues?.[name]}
                className={inputStyles}
                type={type}
                {...register(name)}
            />
            {!!errors[name] && (
                <span className={styles.error}>
                    {errors[name]?.message as string}
                </span>
            )}
        </label>
    )
}
