import {
    firebaseAddImage,
    firebaseIncrementUserImageCounter,
} from "@appFirebase/api"
import { createErrorToast } from "@appShared/utils"
import { useState } from "react"

export function useSaveImage() {
    const [isLoading, setIsLoading] = useState(false)

    const saveImage = async (imageName: string, imgDataUrl: string) => {
        setIsLoading(true)

        try {
            await firebaseAddImage(imageName, imgDataUrl)
            await firebaseIncrementUserImageCounter()
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
