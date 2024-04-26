import { NavLink } from "react-router-dom"
import { Routes } from "../../../../shared/constants"
import { Button } from "../../../../shared"
import { signOut } from "../../../auth"
import { useAppDispatch } from "../../../../store"

export const NavPanel = () => {
    const dispatch = useAppDispatch()

    return (
        <nav>
            <NavLink to={Routes.Main}>Main</NavLink>
            <NavLink to={Routes.Editor}>Editor</NavLink>
            <NavLink to={Routes.SignIn}>Sign In</NavLink>
            <NavLink to={Routes.SignUp}>Sign Up</NavLink>
            <Button onClick={() => dispatch(signOut())}>Sign Out</Button>
        </nav>
    )
}
