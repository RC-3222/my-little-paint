import { storage, db } from "@appFirebase/firebase"
import { TOAST_TIMEOUT } from "@appShared"
import type { User } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { ref, uploadString, getDownloadURL } from "firebase/storage"
import { useState } from "react"
import { toast } from "react-toastify"
//import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid"

export function useSaveImage(user: User | null) {
    const [isLoading, setIsLoading] = useState(false)

    const saveImage = async (imageName: string, imgDataUrl: string) => {
        setIsLoading(true)

        try {
            const id = uuidv4()
            const storageRef = ref(storage, `images/${id}.png`)

            const snapshot = await uploadString(
                storageRef,
                imgDataUrl,
                "data_url",
            )
            const downloadURL = await getDownloadURL(snapshot.ref)

            await addDoc(collection(db, "images"), {
                imageName: imageName,
                imageUrl: downloadURL,
                createAt: new Date(),
                userName: user?.displayName,
                userEmail: user?.email,
                storagePath: `images/${id}.png`,
            })
        } catch (e) {
            let errorMessage = "Error while saving your image"

            const toastId = "saveImgError"

            toast.error(errorMessage, {
                position: "bottom-right",
                autoClose: TOAST_TIMEOUT,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: toastId,
                updateId: toastId,
            })

            console.error(e)
        }

        setIsLoading(false)
    }

    return { saveImage, isLoading }
}
