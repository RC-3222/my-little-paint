import { createHashRouter, Navigate, RouterProvider } from "react-router-dom"
import { ProtectedRoute } from "@appModules/auth"
import { SignUp, SignIn, Editor, Main } from "../pages"

import { Routes } from "@appShared/constants"

const router = createHashRouter(
    [
        {
            path: Routes.SignUp,
            element: <SignUp />,
        },
        {
            path: Routes.SignIn,
            element: <SignIn />,
        },
        {
            path: Routes.Root,
            element: <ProtectedRoute />,
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
    ],
    {},
)

export const AppRouterProvider = () => <RouterProvider router={router} />
