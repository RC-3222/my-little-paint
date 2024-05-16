import { useEffect } from "react"
import { useRouteError } from "react-router-dom"

import styles from "./error-element.module.scss"
import { Card } from "@appShared/components"

export const ErrorElement = () => {
    const error = useRouteError()

    useEffect(() => {
        console.error(error)
    }, [])

    return (
        <div className={styles.errorContainer}>
            <Card className={styles.errorCard}>
                <h2 className={styles.title}>Oops! Something went wrong...</h2>
                <p className={styles.text}>
                    You can help us to fix such issues by providing the
                    information you have in your browser's developer console
                    (how it can be accessed is described{" "}
                    <a
                        target="_blank"
                        href="https://javascript.info/devtools"
                        rel="noreferrer"
                    >
                        here
                    </a>
                    ) or by listing the exact steps you took so that we could
                    reproduce the issue.
                </p>
                <p className={styles.text}>
                    Support Email:{" "}
                    <a href="mailto:youremail@example.com?subject=Error%20in%20MLP">
                        youremail@example.com
                    </a>
                </p>
            </Card>
        </div>
    )
}
