import { useNavigate } from "react-router-dom"
import { SignInForm } from "../sign-in-form"
import { SignUpForm } from "../sign-up-form"

import styles from "./auth-layout.module.scss"
import { useAppSelector } from "../../../../store"
import { selectUser } from "../../store"
import { useEffect } from "react"
import { Routes } from "../../../../shared"

type AuthLayoutProps = {
    type: "sign-in" | "sign-up"
}

export const AuthLayout = ({ type }: AuthLayoutProps) => {
    const user = useAppSelector(selectUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate(Routes.Main)
    }, [user])

    return (
        <main className={styles.main}>
            {type === "sign-in" ? <SignInForm /> : <SignUpForm />}
        </main>
    )
}
