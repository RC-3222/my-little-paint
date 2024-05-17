import type { ImageData } from "@appShared/types"

import styles from "./item.module.scss"
import { auth } from "@appFirebase/firebase"
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
} from "react-router-dom"
import { Button, Confirm, Modal } from "@appShared/components"
import { useDeleteImage } from "@appModules/main/hooks/use-delete-image"
import { Routes } from "@appShared/constants"
import { DeleteIcon, EditIcon } from "./icons"
import { useState } from "react"

type ItemProps = ImageData

export const Item = (props: ItemProps) => {
    const { imageName, userEmail, imageUrl } = props

    const [_, setUrlSearchParams] = useSearchParams()

    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showFullImage, setShowFullImage] = useState(false)

    const onEmailClick = () => {
        setUrlSearchParams(params => ({ ...params, email: userEmail }))
    }

    const { deleteImage, isLoading } = useDeleteImage()

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
                        <Button
                            variant="secondary"
                            onClick={() => setShowConfirmation(true)}
                        >
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
                <img
                    alt={imageName}
                    src={imageUrl}
                    className={styles.image}
                    onClick={() => setShowFullImage(true)}
                />
            </div>
            {isLoading && (
                <div className={styles.loader}>
                    <span>Deleting...</span>
                </div>
            )}
            <Confirm
                open={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={() => {
                    deleteImage(props)
                    setShowConfirmation(false)
                }}
                text={`Are you sure you want to delete ${imageName}?`}
            />
            <Modal open={showFullImage} onClose={() => setShowFullImage(false)}>
                <div className={styles.fullImgContainer}>
                    <img
                        className={styles.fullImg}
                        src={imageUrl}
                        alt={imageName}
                    />
                </div>
            </Modal>
        </li>
    )
}
