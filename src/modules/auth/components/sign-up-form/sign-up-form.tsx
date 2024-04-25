import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../../store/hooks"
import { signIn } from "../../store/auth-slice"
import { Routes } from "../../../../shared/constants"
import type { FormEventHandler } from "react"
import { Button } from "../../../../shared/components"
import { Card } from "../../../../shared/components"

export const SignUpForm = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const handleSubmit: FormEventHandler = ev => {
        ev.preventDefault()

        dispatch(signIn())

        navigate(Routes.Main)
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up Form</h2>
                <Button type="submit">Sign Up</Button>
            </form>
        </Card>
    )
}
