import type { KeyboardEvent, MouseEventHandler } from "react"
import { useLayoutEffect, useRef, useState } from "react"
import { TextField } from "./text-field"
import { createPortal } from "react-dom"
import type { Option } from "./options"
import { Options } from "./options"
import styles from "./select.module.scss"
import classNames from "classnames"

import Icon from "./toggle-icon.svg?react"

export type SelectProps = {
    open: boolean
    onToggle: (open: boolean) => void
    value: string | number | null
    onChange: (value: string | number | null) => void
    options: Option[]
    label?: string
    disabled?: boolean
    isLoading: boolean
}

export const Select = ({
    open,
    onToggle,
    options,
    value,
    onChange,
    label,
    disabled,
    isLoading,
}: SelectProps) => {
    const [userSelection, setUserSelection] = useState(-1)

    const [optionsStyle, setOptionsStyle] = useState<Record<string, string>>({})

    const container = useRef<HTMLDivElement | null>(null)
    const optionsContainer = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        if (
            !open ||
            disabled ||
            !optionsContainer.current ||
            !container.current
        )
            return

        if (open) {
            document.body.classList.add(styles.noScroll)
        }

        const containerRect = container.current.getBoundingClientRect()

        setOptionsStyle({
            "--top": containerRect.bottom + "px",
            "--left": containerRect.left + "px",
            "--width": containerRect.width + "px",
        })

        return () => document.body.classList.remove(styles.noScroll)
    }, [open, disabled])

    const className = classNames(styles.container, {
        [styles.open]: open,
        [styles.disabled]: disabled,
    })

    const handleClick: MouseEventHandler = () => {
        onToggle(!open)
    }

    const handleSelect = (value: string | number | null) => {
        onChange(value)

        onToggle(false)
    }

    const handleBlur = () => {
        onToggle(false)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        e.stopPropagation()

        if ((e.key === " " || e.key === "Enter") && !open) {
            onToggle(true)
            return
        }

        if (e.key === "ArrowDown") {
            const newSelection =
                userSelection < options.length - 1 ? userSelection + 1 : 0
            setUserSelection(newSelection)
        }

        if (e.key === "ArrowUp") {
            const newSelection =
                userSelection > 0 ? userSelection - 1 : options.length - 1
            setUserSelection(newSelection)
        }

        if (e.key === "Enter") {
            e.preventDefault()
            onChange(userSelection > -1 ? options[userSelection].value : null)
            onToggle(false)
        }

        if (e.key === "Escape") {
            onToggle(false)
        }
    }

    return (
        <div
            ref={container}
            className={className}
            onClick={handleClick}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
        >
            <TextField
                label={label as string}
                value={
                    value === null
                        ? ""
                        : options.find(item => item.value === value)?.title ||
                          (value as string)
                }
                disabled={disabled}
                rightIcon={
                    <Icon
                        onClick={e => e.preventDefault()}
                        className={styles.icon}
                    />
                }
                role="combobox"
                readOnly
            />
            {!disabled &&
                open &&
                createPortal(
                    <Options
                        style={optionsStyle}
                        options={options}
                        isLoading={isLoading}
                        selectedValue={value}
                        ref={optionsContainer}
                        onSelect={handleSelect}
                        onClose={() => onToggle(false)}
                        userSelection={userSelection}
                    />,
                    document.body,
                )}
        </div>
    )
}
