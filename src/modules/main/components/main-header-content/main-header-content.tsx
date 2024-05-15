import { Button } from "@appShared/components"
import { signOut } from "@appModules/auth"
import { AppTitle } from "../app-title"
import { NavPanel } from "../../../../shared/components/nav-panel"
import { Search } from "../search"
import { useAppDispatch } from "@appStore"

import styles from "./main-header-content.module.scss"

export const MainHeaderContent = () => {
    const dispatch = useAppDispatch()

    return (
        <>
            <div className={styles.block}>
                <AppTitle />
            </div>
            <div className={styles.block}>
                <Search />
            </div>
            <div className={styles.block}>
                <NavPanel />
                <Button
                    variant="secondary"
                    onClick={() => {
                        dispatch(signOut())
                    }}
                >
                    Sign Out
                </Button>
            </div>
        </>
    )
}
