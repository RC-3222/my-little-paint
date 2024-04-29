import { useEffect } from "react"
import { AuthLayout, SignUpForm } from "@appModules/auth"
import { toast } from "react-toastify"

export const SignUp = () => {
    useEffect(() => {
        return () => toast.dismiss()
    }, [])

    return (
        <AuthLayout>
            <SignUpForm />
        </AuthLayout>
    )
}
