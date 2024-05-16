import { useSearchParams } from "react-router-dom"
import styles from "./pagination-controls.module.scss"
import { useAppSelector } from "@appStore"
import {
    selectData,
    selectHasNextPage,
    selectHasPrevPage,
} from "@appModules/main/store"
import { Button } from "@appShared/components"
import type { QueryDirections } from "@appFirebase/api"
import { useCallback } from "react"
import { UrlParams } from "@appModules/main/constants"

export const PaginationControls = () => {
    const data = useAppSelector(selectData)

    const hasPrevPage = useAppSelector(selectHasPrevPage)
    const hasNextPage = useAppSelector(selectHasNextPage)

    const [_, setSearchParams] = useSearchParams()

    const changePage = useCallback(
        (docId: string, queryDirection: QueryDirections) => {
            setSearchParams(prevParams => {
                //const email = prevParams.get("email");
                const email = prevParams.get(UrlParams.Email) ?? undefined
                const newParams = {
                    ...prevParams,
                    email,
                    [UrlParams.DocId]: docId,
                    [UrlParams.QueryDirection]: queryDirection,
                }
                return newParams
            })
        },
        [setSearchParams],
    )

    return (
        <div className={styles.container}>
            {hasPrevPage && (
                <Button onClick={() => changePage(data[0].id, "before")}>
                    Previous
                </Button>
            )}
            {hasNextPage && (
                <Button
                    onClick={() =>
                        changePage(data[data.length - 1].id, "after")
                    }
                >
                    Next
                </Button>
            )}
        </div>
    )
}
