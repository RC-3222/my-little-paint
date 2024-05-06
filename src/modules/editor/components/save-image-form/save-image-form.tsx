import { Form, FormInput, FormSubmitButton, GlobalLoader } from "@appShared"

import styles from "./save-image-form.module.scss"
import { SaveImgSchema } from "@appModules/editor/schemas"
import type { TypeOf } from "zod"
import { auth } from "@appFirebase/firebase"
import { useSaveImage } from "@appModules/editor/hooks"
import type { User } from "firebase/auth"
import { useEffect, type RefObject } from "react"
import { Backdrop } from "@appShared/components/backdrop"

type SaveImageFormProps = {
    canvasRef: RefObject<HTMLCanvasElement>
    onClose: () => void
}

export const SaveImageForm = ({ onClose, canvasRef }: SaveImageFormProps) => {
    const { saveImage, isLoading } = useSaveImage(auth.currentUser as User)

    const onSubmit = async ({ imgName }: TypeOf<typeof SaveImgSchema>) => {
        const dataUrl = canvasRef.current?.toDataURL()

        if (dataUrl) {
            await saveImage(imgName, dataUrl)
        }

        onClose()
    }

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    onClose()
                    break
                default:
                    return
            }
        }

        window.addEventListener("keydown", keyDownHandler)

        return () => window.removeEventListener("keydown", keyDownHandler)
    }, [onClose])

    return (
        <>
            <Backdrop
                onClick={e => {
                    if (e.target === e.currentTarget) onClose()
                }}
            >
                <Form
                    schema={SaveImgSchema}
                    onSubmit={onSubmit}
                    className={styles.form}
                >
                    <h2>Save Image</h2>
                    <FormInput label="Image name" type="text" name="imgName" />
                    <FormSubmitButton>Save</FormSubmitButton>
                </Form>
            </Backdrop>
            {isLoading && <GlobalLoader />}
        </>
    )
}
