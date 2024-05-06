import { FormSchema, signUp } from "@appModules/auth"
import { FormSubmitButton, FormInput, Form } from "@appShared/components"
import { useAppDispatch } from "@appStore"
import { Link } from "react-router-dom"
import type { TypeOf } from "zod"

import styles from "./sign-up-form.module.scss"
import { Routes } from "@appShared/constants"

export const SignUpForm = () => {
    const dispatch = useAppDispatch()

    const onSubmit = ({ email, password }: TypeOf<typeof FormSchema>) => {
        dispatch(signUp({ email, password }))
    }

    return (
        <Form schema={FormSchema} onSubmit={onSubmit} className={styles.form}>
            <h2>Sign Up Form</h2>
            <FormInput label="Email" type="text" name="email" />
            <FormInput label="Password" type="password" name="password" />
            <FormSubmitButton>Sign Up</FormSubmitButton>
            <span>
                Already have an account? <Link to={Routes.SignIn}>Sign In</Link>
            </span>
        </Form>
    )
}
