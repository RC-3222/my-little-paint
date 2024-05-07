import { FormSchema, signIn } from "@appModules/auth"
import { FormSubmitButton, FormInput, Form } from "@appShared/components"

import { useAppDispatch } from "@appStore"
import { Link } from "react-router-dom"
import type { TypeOf } from "zod"

import styles from "./sign-in-form.module.scss"
import { Routes } from "@appShared/constants"

export const SignInForm = () => {
    const dispatch = useAppDispatch()

    const onSubmit = ({ email, password }: TypeOf<typeof FormSchema>) => {
        dispatch(signIn({ email, password }))
    }

    return (
        <Form schema={FormSchema} onSubmit={onSubmit} className={styles.form}>
            <h2>Sign In Form</h2>
            <FormInput label="Email" type="text" name="email" />
            <FormInput label="Password" type="password" name="password" />
            <FormSubmitButton>Sign In</FormSubmitButton>
            <span>
                Don't have an account yet?{" "}
                <Link to={Routes.SignUp}>Sign Up</Link>
            </span>
        </Form>
    )
}
