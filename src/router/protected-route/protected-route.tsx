import type { PropsWithChildren } from "react"
import { useLocation, Navigate } from "react-router-dom"
import { Routes } from "../router"
import { useAppSelector } from "../../store/hooks"
import { selectIsAuthorized } from "../../store/slices/auth-slice"

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const auth = useAppSelector(selectIsAuthorized)
  const location = useLocation()

  if (!auth) {
    return <Navigate to={Routes.SignIn} state={{ from: location }} replace />
  }

  return children
}
