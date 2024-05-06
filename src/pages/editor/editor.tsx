import { useEffect } from "react"
import { toast } from "react-toastify"
import { EditorLayout } from "../../modules/editor"

export const Editor = () => {
    useEffect(() => {
        return () => toast.dismiss()
    }, [])

    return <EditorLayout />
}
