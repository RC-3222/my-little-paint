import {
    firebaseAddImage,
    firebaseIncrementUserImageCounter,
} from "@appFirebase/api"
import { createErrorToast } from "@appShared/utils"
import { useAppDispatch, useAppSelector } from "@appStore"
import { useState } from "react"
import { selectCurrentImageData, setCurrentImageData } from "../store"
import { useSearchParams } from "react-router-dom"

export function useSaveImage() {
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useAppDispatch()

    const currentImageData = useAppSelector(selectCurrentImageData)

    const [_, setParams] = useSearchParams()

    const saveImage = async (imageName: string, imgDataUrl: string) => {
        setIsLoading(true)
        try {
            const data = await firebaseAddImage(
                imageName,
                imgDataUrl,
                currentImageData ?? undefined,
            )
            if (data) {
                if (!currentImageData) await firebaseIncrementUserImageCounter()
                dispatch(setCurrentImageData(data))
                setParams(params => ({ ...params, imageId: data.id }), {
                    replace: true,
                })
            }
        } catch (e) {
            let errorMessage = "Error while saving your image"

            createErrorToast(errorMessage, "saveImgError")

            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    return { saveImage, isLoading }
}
