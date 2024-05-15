import styles from "./instrument-panel.module.scss"
import { InstrumentParams } from "../instrument-params"
import { InstrumentSelector } from "../instrument-selector"
import { Button } from "@appShared/components"

type InstrumentPanelProps = {
    onSave: () => void
    onRestart: () => void
}

export const InstrumentPanel = ({
    onRestart,
    onSave,
}: InstrumentPanelProps) => {
    return (
        <div className={styles.instrumentPanel}>
            <div className={styles.buttons}>
                <Button onClick={onRestart}>Restart</Button>
                <Button onClick={onSave}>Save</Button>
            </div>
            <InstrumentSelector />
            <InstrumentParams />
        </div>
    )
}
