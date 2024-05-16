import { useSearchParams } from "react-router-dom"
import { useGetUsers } from "@appModules/main/hooks"
import { useState } from "react"
import { Select } from "@appShared/components"

import type { Option } from "@appShared/components/select"
import { UrlParams } from "@appModules/main/constants"

export const Search = () => {
    const [searchParams, setUrlSearchParams] = useSearchParams()

    const [open, setOpen] = useState(false)

    const onChange = (val: string | number | null) => {
        if (val === "All") setUrlSearchParams({})
        else
            setUrlSearchParams(params => {
                return { ...params, [UrlParams.Email]: val }
            })
    }

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

    const value = searchParams.get(UrlParams.Email) || "All"

    return (
        <Select
            isLoading={isLoading}
            options={options}
            value={value}
            onChange={onChange}
            open={open}
            onToggle={onToggle}
        />
    )
}
