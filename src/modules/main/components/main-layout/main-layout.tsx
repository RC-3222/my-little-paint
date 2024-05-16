import { Loader } from "@appShared/components"

import styles from "./main-layout.module.scss"
import { useAppDispatch, useAppSelector } from "@appStore"
import { useEffect } from "react"
import {
    getData,
    selectData,
    selectPageCount,
    selectRequestStatus,
} from "@appModules/main/store"
import { ImageList } from "../image-list"
import { useSearchParams } from "react-router-dom"
import { ReqState } from "@appShared/constants"
import { PaginationControls } from "../pagination-controls"
//import { firebaseGetUsers } from "@appFirebase/api"

export const MainLayout = () => {
    const dispatch = useAppDispatch()

    const data = useAppSelector(selectData)

    const pageCount = useAppSelector(selectPageCount)

    const [urlParams] = useSearchParams()

    const email = urlParams.get("email")
    const pageNum = urlParams.get("pageNum")

    useEffect(() => {
        dispatch(
            getData({
                email: email ?? undefined,
                pageNum: pageNum ? +pageNum : 0,
            }),
        )
        //firebaseGetUsers().then((data)=>console.log(data)).catch(err=>console.error(err))
    }, [email, pageNum, dispatch])

    const reqStatus = useAppSelector(selectRequestStatus)

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                {reqStatus === ReqState.Pending ? (
                    <Loader className={styles.loader} />
                ) : (
                    <>
                        <ImageList data={data} />
                        {pageCount > 1 && <PaginationControls />}
                    </>
                )}
            </div>
        </main>
    )
}
