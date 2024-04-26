import { Link } from "react-router-dom"
import { Routes } from "../../../../shared/constants"
import { Card, Button } from "../../../../shared/components"
import { FormInput } from "../form-input/form-input"
import { Form } from "../form"

import styles from "./sign-in-form.module.scss"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { selectError, signIn } from "../../store"
import { useForm } from "react-hook-form"
import { FormSchema, type FormSchemaType } from "../../schemas"
import { zodResolver } from "@hookform/resolvers/zod"

export const SignInForm = () => {
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
        dispatch(signIn({ email, password }))
    }

    return (
        <Card className={styles.container}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign In Form</h2>
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
                    Sign In
                </Button>
            </Form>
            <span>
                Don't have an account yet?{" "}
                <Link to={Routes.SignUp}>Sign up</Link>
            </span>
            {error && <span>{error}</span>}
        </Card>
    )
}
