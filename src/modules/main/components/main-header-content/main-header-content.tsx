import { Button } from "@appShared/components"
import { signOut } from "@appModules/auth"
import { AppTitle } from "../app-title"
import { NavPanel } from "../../../../shared/components/nav-panel"
import { Search } from "../search"
import { useAppDispatch } from "@appStore"

import styles from "./main-header-content.module.scss"
import { useState } from "react"
import { Confirm } from "@appShared/components"

export const MainHeaderContent = () => {
    const [showConfirmation, setShowConfirmation] = useState(false)

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
                    onClick={() => setShowConfirmation(true)}
                >
                    Sign Out
                </Button>
            </div>
            <Confirm
                open={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={() => {
                    dispatch(signOut())
                    setShowConfirmation(false)
                }}
                text={`Are you sure you want to sign out?`}
            />
        </>
    )
}
