import type { ComponentPropsWithoutRef } from "react"

type NumberInputProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
    label: string
}

export const NumberInput = ({
    className,
    label,
    ...props
}: NumberInputProps) => {
    return (
        <label className={className}>
            <span>{label}</span>
            <input {...props} type="number" />
        </label>
    )
}
