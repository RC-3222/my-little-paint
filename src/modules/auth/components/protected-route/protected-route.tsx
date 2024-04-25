import type { PropsWithChildren } from "react"
import { useLocation, Navigate } from "react-router-dom"
import { Routes } from "../../../../shared/constants"
import { useAppSelector } from "../../../../store/hooks"
import { selectUser } from "../.."

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const auth = useAppSelector(selectUser)
    const location = useLocation()

    if (!auth) {
        return (
            <Navigate to={Routes.SignIn} state={{ from: location }} replace />
        )
    }

    return children
}
