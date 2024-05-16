import type { ImageData } from "@appShared/types"

import styles from "./item.module.scss"
import { auth } from "@appFirebase/firebase"
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
} from "react-router-dom"
import { Button } from "@appShared/components"
import { useDeleteImage } from "@appModules/main/hooks/use-delete-image"
import { Routes } from "@appShared/constants"
import { DeleteIcon, EditIcon } from "./icons"

type ItemProps = ImageData

export const Item = (props: ItemProps) => {
    const { imageName, userEmail, imageUrl } = props

    const [_, setUrlSearchParams] = useSearchParams()

    const onEmailClick = () => {
        setUrlSearchParams(params => ({ ...params, reqStr: userEmail }))
    }

    const { deleteImage, isLoading } = useDeleteImage()

    const onDelete = () => {
        deleteImage(props)
    }

    const navigate = useNavigate()

    const onEdit = () => {
        navigate({
            pathname: Routes.Editor,
            search: createSearchParams({
                imageId: props.id,
            }).toString(),
        })
    }

    return (
        <li className={styles.item}>
            <div className={styles.header}>
                <h4 className={styles.title}>
                    {imageName} by{" "}
                    <button
                        type="button"
                        onClick={onEmailClick}
                        className={styles.clickableEmail}
                    >
                        {userEmail}
                    </button>{" "}
                </h4>
                {auth?.currentUser?.email === userEmail && (
                    <div className={styles.headerButtons}>
                        <Button variant="secondary" onClick={onDelete}>
                            <DeleteIcon
                                className={styles.icon}
                                width={24}
                                height={24}
                            />
                        </Button>
                        <Button variant="secondary" onClick={onEdit}>
                            <EditIcon
                                className={styles.icon}
                                width={24}
                                height={24}
                            />
                        </Button>
                    </div>
                )}
            </div>
            <div className={styles.imageContainer}>
                <img alt={imageName} src={imageUrl} className={styles.image} />
            </div>
            {isLoading && (
                <div className={styles.loader}>
                    <span>Deleting...</span>
                </div>
            )}
        </li>
    )
}
