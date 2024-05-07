import { Button, StickyHeader } from "@appShared/components"
import { AppTitle } from "../app-title"
import { NavPanel } from "../nav-panel"
import { Search } from "../search"

import styles from "./main-layout.module.scss"
import { useAppDispatch } from "@appStore"
import { signOut } from "@appModules/auth"

export const MainLayout = () => {
    const dispatch = useAppDispatch()

    return (
        <>
            <StickyHeader className={styles.header}>
                <div className={styles.header__leftSide}>
                    <AppTitle />
                    <Search />
                </div>
                <div className={styles.header__rightSide}>
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
            </StickyHeader>
            <main className={styles.main}>
                <div className={styles.content}>My cum</div>
            </main>
        </>
    )
}
