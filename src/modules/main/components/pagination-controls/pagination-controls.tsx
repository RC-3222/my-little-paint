import { useSearchParams } from "react-router-dom"
import styles from "./pagination-controls.module.scss"
import { useAppSelector } from "@appStore"
import { selectPageCount } from "@appModules/main/store"
import { Button } from "@appShared/components"

export const PaginationControls = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const param = searchParams.get("pageNum")
    const pageNum = param ? +param : 0

    const pageCount = useAppSelector(selectPageCount)

    const updatePageNum = (newPageNum: number) => {
        setSearchParams(prevParams => ({ ...prevParams, pageNum: newPageNum }))
    }

    return (
        <div className={styles.container}>
            {pageNum - 1 > 0 && (
                <Button onClick={() => updatePageNum(0)}>First</Button>
            )}
            {pageNum > 0 && (
                <Button onClick={() => updatePageNum(pageNum - 1)}>
                    Previous
                </Button>
            )}
            <span className={styles.pageNum}>{pageNum + 1}</span>
            {pageNum + 1 < pageCount && (
                <Button onClick={() => updatePageNum(pageNum + 1)}>Next</Button>
            )}
            {pageNum + 2 < pageCount && (
                <Button onClick={() => updatePageNum(pageCount - 1)}>
                    Last
                </Button>
            )}
        </div>
    )
}
