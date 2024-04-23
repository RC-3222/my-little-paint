import { NavLink } from "react-router-dom"
import { Routes } from "../../router"

export const NavPanel = () => {
  return (
    <nav>
      <NavLink to={Routes.Main}>Main</NavLink>
      <NavLink to={Routes.Editor}>Editor</NavLink>
      <NavLink to={Routes.SignIn}>Sign In</NavLink>
      <NavLink to={Routes.SignUp}>Sign Up</NavLink>
    </nav>
  )
}
