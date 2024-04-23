import { useAppDispatch } from "../../store/hooks"
import { signIn } from "../../store/slices/auth-slice"

export const SignUp = () => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <h2>Sign Up</h2>
      <button onClick={() => dispatch(signIn())}>Sign Up</button>
    </div>
  )
}
