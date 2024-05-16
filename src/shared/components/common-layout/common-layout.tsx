import type { PropsWithChildren } from "react"
import { CommonHeader } from "../common-header"

export const CommonLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <CommonHeader />
            {children}
        </>
    )
}
