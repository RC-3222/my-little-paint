import { Button } from "@appShared"
import styles from "./form-submit-button.module.scss"
import type { PropsWithChildren } from "react"

export const FormSubmitButton = ({ children }: PropsWithChildren) => {
    return (
        <Button className={styles.submitButton} type="submit">
            {children}
        </Button>
    )
}
