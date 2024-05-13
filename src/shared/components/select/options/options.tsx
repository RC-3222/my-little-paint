import type { MouseEvent } from "react"
import { forwardRef } from "react"
import styles from "./options.module.scss"
import classNames from "classnames"
import { Loader } from "@appShared/components"

export type Option = {
    value: number | string | null
    title: string
}

type OptionsProps = {
    style: Record<string, string>
    options: Option[]
    onSelect: (value: string | number | null) => void
    onClose: () => void
    selectedValue: number | string | null
    userSelection: number
    isLoading: boolean
}
export const Options = forwardRef<HTMLDivElement, OptionsProps>(
    (
        { options, onSelect, selectedValue, userSelection, style, isLoading },
        ref,
    ) => {
        const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault()
        }

        const handleClick = (value: string | number | null) => {
            onSelect(value)
        }

        return (
            <div
                style={style}
                className={styles.optionsContainer}
                ref={ref}
                onMouseDown={handleMouseDown}
            >
                {isLoading && <Loader className={styles.loader} />}
                {!isLoading &&
                    options.map((item, index) => {
                        const className = classNames(styles.option, {
                            [styles.current]: item.value === selectedValue,
                            [styles.selected]: index === userSelection,
                        })

                        return (
                            <option
                                className={className}
                                key={item.value}
                                value={item.value ?? undefined}
                                onClick={() => {
                                    handleClick(item.value)
                                }}
                            >
                                {item.title}
                            </option>
                        )
                    })}
            </div>
        )
    },
)
Options.displayName = "Options"
