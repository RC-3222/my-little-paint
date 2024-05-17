import { Button } from "../button"
import { Card } from "../card"
import { Modal } from "../modal"

import styles from "./confirm.module.scss"

type ConfirmProps = {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    text?: string
}

export const Confirm = ({ onConfirm, text, ...props }: ConfirmProps) => {
    const actualText = text || "Are you sure?"

    return (
        <Modal {...props}>
            <Card className={styles.card}>
                <h3 className={styles.text}>{actualText}</h3>
                <div className={styles.buttonBlock}>
                    <Button onClick={() => props.onClose()}>No</Button>
                    <Button onClick={() => onConfirm()}>Yes</Button>
                </div>
            </Card>
        </Modal>
    )
}
