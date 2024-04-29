import { useEffect } from "react"
import { toast } from "react-toastify"
import { AuthLayout } from "../../../modules/auth"

export const SignIn = () => {
    useEffect(() => {
        return () => toast.dismiss()
    }, [])

    return <AuthLayout type="sign-in" />
}
