import type { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { Routes } from "../../../../shared/constants"
import { useAppSelector } from "../../../../store/hooks"
import { selectUser } from "../.."

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const user = useAppSelector(selectUser)

    return user ? children : <Navigate to={Routes.SignIn} replace />
}
