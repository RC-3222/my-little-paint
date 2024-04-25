import { createHashRouter, Navigate, RouterProvider } from "react-router-dom"
import { ProtectedRoute } from "../modules/auth"
import { SignUp, SignIn, Editor, Main } from "../pages"

import { Routes } from "../shared/constants"

const router = createHashRouter([
    {
        path: Routes.SignUp,
        element: <SignUp />,
    },
    {
        path: Routes.SignIn,
        element: <SignIn />,
    },
    {
        path: Routes.Main,
        element: (
            <ProtectedRoute>
                <Main />
            </ProtectedRoute>
        ),
    },
    {
        path: Routes.Editor,
        element: (
            <ProtectedRoute>
                <Editor />
            </ProtectedRoute>
        ),
    },
    {
        path: Routes.Fallback,
        element: <Navigate to={Routes.Main} replace />,
    },
])

export const AppRouterProvider = () => {
    return <RouterProvider router={router} />
}
