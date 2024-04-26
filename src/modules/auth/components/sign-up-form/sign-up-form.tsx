import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import { Routes } from "../../../../shared/constants"
import { Button } from "../../../../shared/components"
import { Card } from "../../../../shared/components"
import { FormInput } from "../form-input/form-input"

import styles from "./sign-up-form.module.scss"
import { Form } from "../form"
import { selectError, signUp } from "../../store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { type FormSchemaType, FormSchema } from "../../schemas"

export const SignUpForm = () => {
    const error = useAppSelector(selectError)

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = ({ email, password }: FormSchemaType) => {
        dispatch(signUp({ email, password }))
    }

    return (
        <Card className={styles.container}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign Up Form</h2>
                <FormInput
                    label="Email"
                    type="text"
                    name="email"
                    error={errors.email}
                    register={register}
                />
                <FormInput
                    label="Password"
                    type="password"
                    error={errors.password}
                    name="password"
                    register={register}
                />
                <Button className={styles.submitButton} type="submit">
                    Sign Up
                </Button>
            </Form>
            <span>
                Already have an account? <Link to={Routes.SignIn}>Sign In</Link>
            </span>
            {error && <span>{error}</span>}
        </Card>
    )
}
