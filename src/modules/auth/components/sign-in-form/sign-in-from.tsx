import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../../store/hooks"
import { signIn } from "../../store/auth-slice"
import { Routes } from "../../../../shared/constants"
import type { FormEventHandler } from "react"
import { Card } from "../../../../shared/components/card"
import { Button } from "../../../../shared/components/button"

export const SignInForm = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const handleSubmit: FormEventHandler = ev => {
        ev.preventDefault()

        dispatch(signIn())

        navigate(location.state?.from ?? Routes.Main)
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>Sign In Form</h2>
                <Button type="submit">Sign In</Button>
            </form>
        </Card>
    )
}
