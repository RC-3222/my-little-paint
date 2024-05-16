import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "@appStore"
import { Routes } from "@appShared/constants"
import { selectUser } from "../.."
import { CommonLayout } from "@appShared/components/common-layout"

export const ProtectedRoute = () => {
    const user = useAppSelector(selectUser)

    return user ? (
        <CommonLayout>
            <Outlet />
        </CommonLayout>
    ) : (
        <Navigate to={Routes.SignIn} replace />
    )
}
