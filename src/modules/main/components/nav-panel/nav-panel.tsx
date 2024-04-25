import { NavLink } from "react-router-dom"
import { Routes } from "../../../../shared/constants"
import { Button } from "../../../../shared"
import { signOut } from "../../../../firebase/api"

export const NavPanel = () => {
    return (
        <nav>
            <NavLink to={Routes.Main}>Main</NavLink>
            <NavLink to={Routes.Editor}>Editor</NavLink>
            <NavLink to={Routes.SignIn}>Sign In</NavLink>
            <NavLink to={Routes.SignUp}>Sign Up</NavLink>
            <Button onClick={() => signOut()}>Sign Out</Button>
        </nav>
    )
}
