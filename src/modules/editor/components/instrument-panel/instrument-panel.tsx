import styles from "./instrument-panel.module.scss"
import { InstrumentParams } from "../instrument-params"
import { InstrumentSelector } from "../instrument-selector"

export const InstrumentPanel = () => {
    return (
        <div className={styles.instrumentPanel}>
            <InstrumentSelector />
            <InstrumentParams />
        </div>
    )
}
