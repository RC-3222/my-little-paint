import { Loader } from "@appShared/components"

import styles from "./main-layout.module.scss"
import { useAppDispatch, useAppSelector } from "@appStore"
import { useEffect } from "react"
import {
    getData,
    selectData,
    selectRequestStatus,
} from "@appModules/main/store"
import { ImageList } from "../image-list"
import { useSearchParams } from "react-router-dom"
import { ReqState } from "@appShared/constants"
//import { firebaseGetUsers } from "@appFirebase/api"

export const MainLayout = () => {
    const dispatch = useAppDispatch()

    const data = useAppSelector(selectData)

    const [urlParams] = useSearchParams()

    const searchParam = urlParams.get("reqStr")

    useEffect(() => {
        dispatch(getData(searchParam ?? undefined))

        //firebaseGetUsers().then((data)=>console.log(data)).catch(err=>console.error(err))
    }, [searchParam, dispatch])

    const reqStatus = useAppSelector(selectRequestStatus)

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                {reqStatus === ReqState.Pending ? (
                    <Loader className={styles.loader} />
                ) : (
                    <ImageList data={data} />
                )}
            </div>
        </main>
    )
}
