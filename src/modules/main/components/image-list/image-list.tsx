import type { ImageData } from "@appShared/types"
import { Item } from "./item"

import styles from "./image-list.module.scss"

type ImageListProps = {
    data: ImageData[]
}

export const ImageList = ({ data }: ImageListProps) => {
    return (
        <ul className={styles.list}>
            {data.map(item => {
                return <Item key={item.id} {...item} />
            })}
        </ul>
    )
}
