export type ImageData = {
    id: string
    createAt: number | Date
    imageName: string
    imageUrl: string
    userEmail: string
    storagePath: string
}

export type UserData = {
    id: string
    userEmail: string | null
    imageCounter: number
}
