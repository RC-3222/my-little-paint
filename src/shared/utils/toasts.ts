import { TOAST_TIMEOUT } from "@appShared/constants"
import { type Id, toast } from "react-toastify"

export function createErrorToast(errorMassage: string, id: Id) {
    return toast.error(errorMassage, {
        position: "bottom-right",
        autoClose: TOAST_TIMEOUT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: id,
        updateId: id,
    })
}
