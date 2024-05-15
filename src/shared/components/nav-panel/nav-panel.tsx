import { Link } from "@appShared/components"
import { Routes } from "@appShared/constants"

import styles from "./nav-panel.module.scss"
import { useLocation } from "react-router-dom"

export const NavPanel = () => {
    const location = useLocation()

    return (
        <nav className={styles.navPanel}>
            {location.pathname !== Routes.Main && (
                <Link to={Routes.Main}>To Main</Link>
            )}
            {location.pathname !== Routes.Editor && (
                <Link to={Routes.Editor}>To Editor</Link>
            )}
        </nav>
    )
}
