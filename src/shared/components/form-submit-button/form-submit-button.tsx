import { Button } from "@appShared"
import styles from "./form-submit-button.module.scss"
import type { PropsWithChildren } from "react"

type FormSubmitButtonProps = PropsWithChildren & {
    disabled?: boolean
}

export const FormSubmitButton = ({
    children,
    disabled = false,
}: FormSubmitButtonProps) => {
    return (
        <Button
            className={styles.submitButton}
            type="submit"
            disabled={disabled}
        >
            {children}
        </Button>
    )
}
