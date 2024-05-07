import { useState, useLayoutEffect } from "react"

type WindowSize = {
    height: number
    width: number
}

export function useWindowSize() {
    const [size, setSize] = useState<WindowSize>({
        height: 0,
        width: 0,
    })

    useLayoutEffect(() => {
        const updateSize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener("resize", updateSize)

        updateSize()

        return () => window.removeEventListener("resize", updateSize)
    }, [])

    return size
}
