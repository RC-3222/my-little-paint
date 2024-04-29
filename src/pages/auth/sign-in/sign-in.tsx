import { useEffect } from "react"
import { toast } from "react-toastify"
import { AuthLayout, SignInForm } from "@appModules/auth"

export const SignIn = () => {
    useEffect(() => {
        return () => toast.dismiss()
    }, [])

    return (
        <AuthLayout>
            <SignInForm />
        </AuthLayout>
    )
}
