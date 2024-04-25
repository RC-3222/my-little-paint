import {
    createHashRouter,
    Navigate,
    RouterProvider,
    useNavigate,
} from "react-router-dom"
import { ProtectedRoute, signIn, signOut } from "../modules/auth"
import { SignUp, SignIn, Editor, Main } from "../pages"

import { Routes } from "../shared/constants"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useAppDispatch } from "../store"

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
    const dispatch = useAppDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(signIn(user.email as string))
            } else dispatch(signOut())
        })

        return () => unsubscribe()
    }, [])

    return <RouterProvider router={router} />
}
