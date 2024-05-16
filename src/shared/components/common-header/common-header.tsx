import { Routes } from "@appShared/constants"
import { useLocation } from "react-router-dom"

import styles from "./common-header.module.scss"

import { MainHeaderContent } from "@appModules/main"
import { EditorHeaderContent } from "@appModules/editor"

export const CommonHeader = () => {
    const location = useLocation()

    let headerContent = <h2>You should never see this...</h2>

    switch (location.pathname) {
        case Routes.Main: {
            headerContent = <MainHeaderContent />
            break
        }
        case Routes.Editor: {
            headerContent = <EditorHeaderContent />
            break
        }
        default:
            break
    }

    return <header className={styles.header}>{headerContent}</header>
}
