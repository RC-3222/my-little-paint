import { SignInForm } from "../sign-in-form/sign-in-from"
import { SignUpForm } from "../sign-up-form/sign-up-form"

import styles from "./auth-layout.module.scss"

type AuthLayoutProps = {
    type: "sign-in" | "sign-up"
}

export const AuthLayout = ({ type }: AuthLayoutProps) => {
    return (
        <main className={styles.main}>
            {type === "sign-in" ? <SignInForm /> : <SignUpForm />}
        </main>
    )
}
