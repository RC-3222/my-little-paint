import { Link } from "@appShared/components"
import { Routes } from "@appShared/constants"

import styles from "./nav-panel.module.scss"

export const NavPanel = () => {
    return (
        <nav className={styles.navPanel}>
            <Link to={Routes.Editor}>Editor</Link>
        </nav>
    )
}
