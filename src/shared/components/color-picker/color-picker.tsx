import type { ComponentPropsWithoutRef } from "react"

type ColorPickerProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
    label: string
}

export const ColorPicker = ({
    className,
    label,
    ...props
}: ColorPickerProps) => {
    return (
        <label className={className}>
            <span>{label}</span>
            <input {...props} type="color" />
        </label>
    )
}
