import { StickyHeader } from "@appShared/components/sticky-header/sticky-header"
import { DrawingArea } from "../drawing-area"

import styles from "./editor-layout.module.scss"
import { useState } from "react"
import { Button } from "@appShared"
import { InstrumentPanel } from "../instrument-panel/instrument-panel"

export const EditorLayout = () => {
    const [showInstrumentPanel, setShowInstrumentPanel] = useState(false)

    return (
        <>
            <StickyHeader className={styles.header}>
                <h2 className={styles.title}>Editor</h2>
                <Button onClick={() => setShowInstrumentPanel(prev => !prev)}>
                    Toggle Panel
                </Button>
            </StickyHeader>
            <main className={styles.main}>
                <DrawingArea />
                {showInstrumentPanel && <InstrumentPanel />}
            </main>
        </>
    )
}
