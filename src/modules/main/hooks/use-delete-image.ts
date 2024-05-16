import {
    firebaseDecrementUserImageCounter,
    firebaseRemoveImage,
} from "@appFirebase/api"
import type { ImageData } from "@appShared/types"
import { createErrorToast } from "@appShared/utils"
import { useAppDispatch } from "@appStore"
import { useState } from "react"
import { deleteImage } from "../store"

export function useDeleteImage() {
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useAppDispatch()

    const deleteImageHandler = async (imageData: ImageData) => {
        setIsLoading(true)

        try {
            await firebaseRemoveImage(imageData)

            await firebaseDecrementUserImageCounter()

            dispatch(deleteImage(imageData.id))
        } catch (e) {
            let errorMessage = `Error while deleting ${imageData.imageName}`

            createErrorToast(errorMessage, "ImgRemovalError")

            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    return { deleteImage: deleteImageHandler, isLoading }
}
