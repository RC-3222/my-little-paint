import { useEffect } from "react"
import { toast } from "react-toastify"
import {
    AuthLayout,
    Form,
    FormInput,
    signIn,
    FormSchema,
    type FormSchemaType,
} from "@appModules/auth"
import { useAppDispatch } from "@appStore"
import { Link } from "react-router-dom"
import { Routes } from "@appShared/constants"

export const SignIn = () => {
    useEffect(() => {
        return () => toast.dismiss()
    }, [])

    const dispatch = useAppDispatch()

    const onSubmit = ({ email, password }: FormSchemaType) => {
        dispatch(signIn({ email, password }))
    }

    const redirectTip = (
        <span>
            Don't have an account yet? <Link to={Routes.SignUp}>Sign Up</Link>
        </span>
    )

    return (
        <AuthLayout>
            <Form
                title="Sign In Form"
                schema={FormSchema}
                onSubmit={onSubmit}
                additionalContent={redirectTip}
            >
                <FormInput label="Email" type="text" name="email" />
                <FormInput label="Password" type="password" name="password" />
            </Form>
        </AuthLayout>
    )
}
