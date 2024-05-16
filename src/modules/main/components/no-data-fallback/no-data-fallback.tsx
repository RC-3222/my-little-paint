import { Link } from "react-router-dom"
import styles from "./no-data-fallback.module.scss"
import { Routes } from "@appShared/constants"

export const NoDataFallback = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>No Data</h2>
            <p>
                It is possible that you somehow got some old broken leading
                here, and in such cases we can suggest you to just visit the{" "}
                <Link to={Routes.Main} replace>
                    Initial Page
                </Link>
            </p>
        </div>
    )
}
