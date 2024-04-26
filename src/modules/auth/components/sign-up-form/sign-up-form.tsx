import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../../store/hooks"
import { Routes } from "../../../../shared/constants"
import { Button } from "../../../../shared/components"
import { Card } from "../../../../shared/components"
import type { FormEvent } from "react"
import { useState } from "react"
import { signUpWithEmailAndPass } from "../../../../firebase/api"
import { isPasswordValid, isEmailValid } from "../../utils"
import { FormInput } from "../form-input/form-input"

import styles from "./sign-up-form.module.scss"
import { Form } from "../form"

export const SignUpForm = () => {
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
            await signUpWithEmailAndPass(email, password)
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
                <h2>Sign Up Form</h2>
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
                    Sign Up
                </Button>
            </Form>
            <span>
                Already have an account? <Link to={Routes.SignIn}>Sign In</Link>
            </span>
        </Card>
    )
}
