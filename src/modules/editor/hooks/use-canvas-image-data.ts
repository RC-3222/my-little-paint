import { useAppSelector } from "@appStore"
import { selectCurrentImageData } from "../store"
import type { RefObject } from "react"
import { useEffect } from "react"

type Args = {
    mainCanvasRef: RefObject<HTMLCanvasElement>
}

export const useCanvasImageData = ({ mainCanvasRef }: Args) => {
    const currentImageData = useAppSelector(selectCurrentImageData)

    const imageUrl = currentImageData?.imageUrl

    useEffect(() => {
        if (!imageUrl) return

        const image = new Image()
        image.crossOrigin = "anonymous"
        image.onload = function () {
            const context = mainCanvasRef.current?.getContext("2d")

            if (mainCanvasRef.current && context) {
                context.drawImage(image, 0, 0)
            }
        }
        image.src = imageUrl
    }, [mainCanvasRef, imageUrl])
}
