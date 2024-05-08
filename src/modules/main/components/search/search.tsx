import styles from "./search.module.scss"

import SearchIcon from "./search-icon.svg?react"
import { Form } from "@appShared/components"
import { SearchFormSchema } from "@appModules/main/schemas"
import type { TypeOf } from "zod"
import { createErrorToast } from "@appShared/utils"
import { SearchInput } from "./search-input"
import { useSearchParams } from "react-router-dom"

export const Search = () => {
    const [_, setUrlSearchParams] = useSearchParams()

    const onSubmit = ({ reqStr }: TypeOf<typeof SearchFormSchema>) => {
        setUrlSearchParams(params => ({ ...params, reqStr }))
    }

    return (
        <Form
            onError={e => {
                createErrorToast("Error", "MainError")
            }}
            schema={SearchFormSchema}
            onSubmit={onSubmit}
            className={styles.container}
        >
            <SearchInput
                className={styles.input}
                errorClassName={styles.input_error}
                name="reqStr"
            />
            <button title="search" type="submit" className={styles.button}>
                <SearchIcon />
            </button>
        </Form>
    )
}
