import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "@appStore"
import { Routes } from "@appShared/constants"
import { selectUser } from "../.."

export const ProtectedRoute = () => {
    const user = useAppSelector(selectUser)

    return user ? <Outlet /> : <Navigate to={Routes.SignIn} replace />
}
