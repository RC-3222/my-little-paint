import { useNavigate } from "react-router-dom"

import styles from "./auth-layout.module.scss"
import { useAppSelector } from "../../../../store"
import { selectStatus, selectUser } from "../../store"
import { ReqState, Routes } from "@appShared/constants"
import { GlobalLoader } from "@appShared/components"
import type { PropsWithChildren } from "react"
import { useEffect } from "react"

export const AuthLayout = ({ children }: PropsWithChildren) => {
    const user = useAppSelector(selectUser)

    const status = useAppSelector(selectStatus)

    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate(Routes.Main, { replace: true })
    }, [user, navigate])

    return (
        <main className={styles.main}>
            {children}
            {status === ReqState.Pending && <GlobalLoader />}
        </main>
    )
}
