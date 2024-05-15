import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { ProtectedRoute } from "@appModules/auth"
import { SignUp, SignIn, Editor, Main } from "../pages"

import { Routes } from "@appShared/constants"
import { ErrorElement } from "./error-element"

const router = createBrowserRouter([
    {
        path: Routes.SignUp,
        element: <SignUp />,
        errorElement: <ErrorElement />,
    },
    {
        path: Routes.SignIn,
        element: <SignIn />,
        errorElement: <ErrorElement />,
    },
    {
        path: Routes.Root,
        element: <ProtectedRoute />,
        errorElement: <ErrorElement />,
        children: [
            {
                path: Routes.Main,
                element: <Main />,
            },
            {
                path: Routes.Editor,
                element: <Editor />,
            },
            {
                path: Routes.Root,
                element: <Navigate to={Routes.Main} replace />,
            },
            {
                path: Routes.Fallback,
                element: <Navigate to={Routes.Main} replace />,
            },
        ],
    },
])

export const AppRouterProvider = () => <RouterProvider router={router} />
