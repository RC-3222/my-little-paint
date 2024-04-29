import { NavLink } from "react-router-dom"
import { Button } from "@appShared/components"
import { Routes } from "@appShared/constants"
import { signOut } from "@appModules/auth"
import { useAppDispatch } from "@appStore"

export const NavPanel = () => {
    const dispatch = useAppDispatch()

    return (
        <nav>
            <NavLink to={Routes.Main}>Main</NavLink>
            <NavLink to={Routes.Editor}>Editor</NavLink>
            <Button onClick={() => dispatch(signOut())}>Sign Out</Button>
        </nav>
    )
}
