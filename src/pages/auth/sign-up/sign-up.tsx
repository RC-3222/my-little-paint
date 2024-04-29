import { useEffect } from "react"
import {
    AuthLayout,
    Form,
    signUp,
    FormInput,
    FormSchema,
    type FormSchemaType,
} from "@appModules/auth"
import { toast } from "react-toastify"
import { useAppDispatch } from "@appStore"
import { Link } from "react-router-dom"
import { Routes } from "@appShared/constants"

export const SignUp = () => {
    useEffect(() => {
        return () => toast.dismiss()
    }, [])

    const dispatch = useAppDispatch()

    const onSubmit = ({ email, password }: FormSchemaType) => {
        dispatch(signUp({ email, password }))
    }

    const redirectTip = (
        <span>
            Already have an account? <Link to={Routes.SignIn}>Sign In</Link>
        </span>
    )

    return (
        <AuthLayout>
            <Form
                title="Sign Up Form"
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
