import { Loader } from "@appShared/components"

import styles from "./main-layout.module.scss"
import { useAppDispatch, useAppSelector } from "@appStore"
import { useEffect } from "react"
import {
    getData,
    selectData,
    selectHasNextPage,
    selectHasPrevPage,
    selectRequestStatus,
} from "@appModules/main/store"
import { ImageList } from "../image-list"
import { useSearchParams } from "react-router-dom"
import { ReqState } from "@appShared/constants"
import { PaginationControls } from "../pagination-controls"
import type { QueryDirections } from "@appFirebase/api"
import { NoDataFallback } from "../no-data-fallback"
import { UrlParams } from "@appModules/main/constants"

export const MainLayout = () => {
    const dispatch = useAppDispatch()

    const data = useAppSelector(selectData)

    const [urlParams] = useSearchParams()

    const email = urlParams.get(UrlParams.Email)
    const direction = urlParams.get(UrlParams.QueryDirection)
    const docId = urlParams.get(UrlParams.DocId)

    const hasPrevPage = useAppSelector(selectHasPrevPage)
    const hasNextPage = useAppSelector(selectHasNextPage)

    useEffect(() => {
        dispatch(
            getData({
                email: email,
                queryDirection: direction as QueryDirections,
                docId: docId,
            }),
        )
    }, [email, direction, docId, dispatch])

    const reqStatus = useAppSelector(selectRequestStatus)

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                {reqStatus === ReqState.Pending ? (
                    <Loader className={styles.loader} />
                ) : (
                    <>
                        {data?.length ? (
                            <ImageList data={data} />
                        ) : (
                            <NoDataFallback />
                        )}
                        {(hasPrevPage || hasNextPage) && <PaginationControls />}
                    </>
                )}
            </div>
        </main>
    )
}
