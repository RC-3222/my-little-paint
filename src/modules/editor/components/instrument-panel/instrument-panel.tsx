import { Backdrop } from "@appShared/components/backdrop"
import styles from "./instrument-panel.module.scss"
import { Instruments } from "../../store"
import { InstrumentButton } from "../instrument-button"

export const InstrumentPanel = () => {
    //const dispatch = useAppDispatch()

    return (
        <Backdrop className={styles.backdrop}>
            <div className={styles.instrumentPanel}>
                <InstrumentButton instrument={Instruments.Brush}>
                    Brush
                </InstrumentButton>
                <InstrumentButton instrument={Instruments.Line}>
                    Line
                </InstrumentButton>
                <InstrumentButton instrument={Instruments.Rectangle}>
                    Rectangle
                </InstrumentButton>
                <InstrumentButton instrument={Instruments.Circle}>
                    Circle
                </InstrumentButton>
                <InstrumentButton instrument={Instruments.Ellipse}>
                    Ellipse
                </InstrumentButton>
                <InstrumentButton instrument={Instruments.Star}>
                    Star
                </InstrumentButton>
            </div>
        </Backdrop>
    )
}
