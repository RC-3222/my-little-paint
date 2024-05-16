import { selectCurrentImageData } from "../../store"
import { useAppSelector } from "@appStore"

import styles from "./editor-header-content.module.scss"
import { NavPanel } from "@appShared/components/nav-panel"

export const EditorHeaderContent = () => {
    const currentImageData = useAppSelector(selectCurrentImageData)

    return (
        <>
            <div className={styles.block}>
                <h2 className={styles.title}>Editor</h2>
            </div>
            {currentImageData && (
                <div className={styles.block}>
                    <h3 className={styles.imageTitle}>
                        {currentImageData.imageName}
                    </h3>
                </div>
            )}
            <div className={styles.block}>
                <NavPanel />
            </div>
        </>
    )
}
