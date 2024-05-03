import type { Instruments } from "@appModules/editor/store"
import {
    selectCurrentInstrument,
    setCurrentInstrument,
} from "@appModules/editor/store"
import { useAppDispatch, useAppSelector } from "@appStore"
import type { MouseEventHandler, PropsWithChildren } from "react"

type InstrumentButtonProps = PropsWithChildren & {
    instrument: Instruments
}

export const InstrumentButton = ({
    children,
    instrument,
}: InstrumentButtonProps) => {
    const dispatch = useAppDispatch()

    const currentInstrument = useAppSelector(selectCurrentInstrument)

    const handleClick: MouseEventHandler = () => {
        dispatch(setCurrentInstrument(instrument))
    }

    const isDisabled = currentInstrument === instrument

    return (
        <button type="button" onClick={handleClick} disabled={isDisabled}>
            {children}
        </button>
    )
}
