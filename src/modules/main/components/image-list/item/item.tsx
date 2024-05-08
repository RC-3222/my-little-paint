import type { ImageData } from "@appShared/types"

import styles from "./item.module.scss"

type ItemProps = ImageData

export const Item = ({ imageName, userEmail, imageUrl }: ItemProps) => {
    return (
        <li className={styles.item}>
            <div className={styles.header}>
                <h4 className={styles.title}>
                    {imageName} by {userEmail}
                </h4>
            </div>
            <div className={styles.imageContainer}>
                <img alt={imageName} src={imageUrl} className={styles.image} />
            </div>
        </li>
    )
}
