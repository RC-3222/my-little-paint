import { Button, Loader, StickyHeader } from "@appShared/components"
import { AppTitle } from "../app-title"
import { NavPanel } from "../nav-panel"
import { Search } from "../search"

import styles from "./main-layout.module.scss"
import { useAppDispatch, useAppSelector } from "@appStore"
import { signOut } from "@appModules/auth"
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
        <>
            <StickyHeader className={styles.header}>
                <div className={styles.header__leftSide}>
                    <AppTitle />
                    <Search />
                </div>
                <div className={styles.header__rightSide}>
                    <NavPanel />
                    <Button
                        variant="secondary"
                        onClick={() => {
                            dispatch(signOut())
                        }}
                    >
                        Sign Out
                    </Button>
                </div>
            </StickyHeader>
            <main className={styles.main}>
                <div className={styles.content}>
                    {reqStatus === ReqState.Pending ? (
                        <Loader className={styles.loader} />
                    ) : (
                        <ImageList data={data} />
                    )}
                </div>
            </main>
        </>
    )
}
