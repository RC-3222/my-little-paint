import { firebaseGetUsers } from "@appFirebase/api"
import { type UserData } from "@appShared/types"
import { createErrorToast } from "@appShared/utils"
import { useState } from "react"

export function useGetUsers() {
    const [isLoading, setIsLoading] = useState(false)

    const getUsers = async () => {
        setIsLoading(true)

        try {
            const res = (await firebaseGetUsers()) as UserData[]

            return res
        } catch (e) {
            let errorMessage = `Error while getting users`

            createErrorToast(errorMessage, "UserGettingError")

            console.error(e)
            return []
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, getUsers }
}
