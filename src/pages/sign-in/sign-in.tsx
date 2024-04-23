import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../store/hooks"
import { signIn } from "../../store/slices/auth-slice"
import { Routes } from "../../router"

export const SignIn = () => {
  const dispatch = useAppDispatch()

  const location = useLocation()
  const navigate = useNavigate()

  const handleSignIn = () => {
    dispatch(signIn())

    navigate(location.state?.from ?? Routes.Main)
  }

  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  )
}
