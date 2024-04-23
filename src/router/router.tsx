import { Navigate, RouterProvider, createHashRouter } from "react-router-dom"
import { Main, Editor, SignIn, SignUp } from "../pages"
import { MainLayout } from "../components/main-layout"
import { ProtectedRoute } from "./protected-route"

export const enum Routes {
  Root = "/",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  Main = "/main",
  Editor = "/editor",
  Fallback = "/*",
}

const router = createHashRouter([
  {
    path: Routes.Root,
    element: <MainLayout />,
    children: [
      {
        path: Routes.Root,
        element: <Navigate to={Routes.Main} replace />,
      },
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
    ],
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
