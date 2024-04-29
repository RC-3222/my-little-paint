import { useEffect } from "react"
import { AuthLayout } from "../../../modules/auth"
import { toast } from "react-toastify"

export const SignUp = () => {
    useEffect(() => {
        return () => toast.dismiss()
    }, [])

    return <AuthLayout type="sign-up" />
}
