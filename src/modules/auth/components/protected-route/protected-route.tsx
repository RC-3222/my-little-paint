import { Navigate, Outlet } from "react-router-dom"
import { Routes } from "../../../../shared/constants"
import { useAppSelector } from "../../../../store/hooks"
import { selectUser } from "../.."

export const ProtectedRoute = () => {
    const user = useAppSelector(selectUser)

    return user ? <Outlet /> : <Navigate to={Routes.SignIn} replace />
}
