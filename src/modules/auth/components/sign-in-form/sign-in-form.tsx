import { Link } from "react-router-dom"
import { Routes } from "../../../../shared/constants"
import type { FormEvent } from "react"
import { useState } from "react"
import { Card, Button } from "../../../../shared/components"
import { FormInput } from "../form-input/form-input"
import { isEmailValid, isPasswordValid } from "../../utils"
import { Form } from "../form"

import styles from "./sign-in-form.module.scss"
import { signInWithEmailAndPass } from "../../../../firebase/api"

export const SignInForm = () => {
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    const validatePassword = (val: string) => {
        if (!isPasswordValid(val)) setPasswordError("Password error")
        else setPasswordError("")
    }

    const validateEmail = (val: string) => {
        if (!isEmailValid(val)) setEmailError("Email error")
        else setEmailError("")
    }

    const authenticate = async () => {
        try {
            await signInWithEmailAndPass(email, password)
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault()

        validatePassword(password)
        validateEmail(email)

        if (passwordError || emailError) return

        authenticate()
    }

    const passwordInputChangeHandler = (val: string) => {
        setPassword(val)
    }

    const emailInputChangeHandler = (val: string) => {
        setEmail(val)
    }

    return (
        <Card className={styles.container}>
            <Form onSubmit={handleSubmit}>
                <h2>Sign In Form</h2>
                <FormInput
                    label="Email"
                    type="text"
                    error={emailError}
                    value={email}
                    onChange={emailInputChangeHandler}
                    validate={validateEmail}
                />
                <FormInput
                    label="Password"
                    type="password"
                    error={passwordError}
                    value={password}
                    onChange={passwordInputChangeHandler}
                    validate={validatePassword}
                />
                <Button className={styles.submitButton} type="submit">
                    Sign In
                </Button>
            </Form>
            <span>
                Don't have an account yet?{" "}
                <Link to={Routes.SignUp}>Sign up</Link>
            </span>
        </Card>
    )
}
