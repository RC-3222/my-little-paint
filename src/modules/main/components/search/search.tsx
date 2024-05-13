import styles from "./search.module.scss"

import SearchIcon from "./search-icon.svg?react"
import { createErrorToast } from "@appShared/utils"
import { useSearchParams } from "react-router-dom"
import { Select } from "../select"
import { useGetUsers } from "@appModules/main/hooks"
import type { FormEventHandler } from "react"
import { useEffect, useState } from "react"

import { type Option } from "../select/options"

export const Search = () => {
    const [_, setUrlSearchParams] = useSearchParams()

    const onSubmit: FormEventHandler = e => {
        e.preventDefault()
        if (!value) return

        if (value === "All")
            setUrlSearchParams(params => {
                params.delete("reqStr")
                return { ...params }
            })
        else setUrlSearchParams(params => ({ ...params, reqStr: value }))
    }

    const [value, setValue] = useState("All")

    const [open, setOpen] = useState(false)

    const [options, setOptions] = useState<Option[]>([
        { value: "All", title: "All" },
    ])

    const { getUsers, isLoading } = useGetUsers()

    const onToggle = (open: boolean) => {
        if (open) {
            getUsers().then(data => {
                const opts: Option[] = data.map(item => {
                    return {
                        value: item.userEmail,
                        title: item.userEmail as string,
                    }
                })
                setOptions([{ value: "All", title: "All" }, ...opts])
            })
        }

        setOpen(open)
    }

    return (
        <form onSubmit={onSubmit} className={styles.container}>
            <Select
                isLoading={isLoading}
                options={options}
                value={value}
                onChange={val => setValue(val as string)}
                open={open}
                onToggle={onToggle}
            />
            <button title="search" type="submit" className={styles.button}>
                <SearchIcon />
            </button>
        </form>
    )
}

/*<form
    onSubmit={onSubmit}
    className={styles.container}
>
    <Select isLoading={isLoading} options={options} value={value} onChange={(val)=>setValue(val as string)} open={open} onToggle={onToggle} />
    <button title="search" type="submit" className={styles.button}>
        <SearchIcon />
    </button>
</form>*/

/*<SearchInput
className={styles.input}
errorClassName={styles.input_error}
name="reqStr"
/>*/
