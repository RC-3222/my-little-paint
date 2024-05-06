import { Instruments } from "@appModules/editor/store"
import { InstrumentButton } from "../instrument-button"

import styles from "./instrument-selector.module.scss"
import {
    BrushIcon,
    CircleIcon,
    EllipseIcon,
    LineIcon,
    RectangleIcon,
    StarIcon,
} from "./icons"

export const InstrumentSelector = () => {
    return (
        <div className={styles.instrumentSelector}>
            <h3 className={styles.title}>Available Instruments</h3>
            <div className={styles.instrumentGrid}>
                <InstrumentButton instrument={Instruments.Brush}>
                    <BrushIcon width={24} height={24} />
                </InstrumentButton>
                <InstrumentButton instrument={Instruments.Line}>
                    <LineIcon width={24} height={24} />
                </InstrumentButton>
                <InstrumentButton instrument={Instruments.Rectangle}>
                    <RectangleIcon width={24} height={24} />
                </InstrumentButton>
                <InstrumentButton instrument={Instruments.Circle}>
                    <CircleIcon width={24} height={24} />
                </InstrumentButton>
                <InstrumentButton instrument={Instruments.Ellipse}>
                    <EllipseIcon width={24} height={24} />
                </InstrumentButton>
                <InstrumentButton instrument={Instruments.Star}>
                    <StarIcon width={24} height={24} />
                </InstrumentButton>
            </div>
        </div>
    )
}
