import { auth, db, imagesRef, storage } from "../firebase"

import { v4 as uuidv4 } from "uuid"

import {
    addDoc,
    getDocs,
    orderBy,
    query,
    where,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore"
import {
    ref,
    deleteObject,
    getDownloadURL,
    uploadString,
} from "firebase/storage"
import type { ImageData } from "@appShared/types"
import { MAX_IMAGES_PER_PAGE } from "@appModules/main/constants"

export async function firebaseGetData(email?: string, pageNum = 0) {
    const q = email
        ? query(
              imagesRef,
              where("userEmail", "==", email),
              orderBy("createAt", "desc"),
          )
        : query(imagesRef, orderBy("createAt", "desc"))

    const docs = await getDocs(q)

    const startIndex = pageNum * MAX_IMAGES_PER_PAGE
    const endIndex = startIndex + MAX_IMAGES_PER_PAGE

    const data = docs.docs
        .map(doc => {
            const data = doc.data()
            return { ...data, id: doc.id, createAt: data?.createAt?.seconds }
        })
        .slice(startIndex, endIndex) as ImageData[]

    return {
        data,
        pageCount: Math.ceil(docs.docs.length / MAX_IMAGES_PER_PAGE),
    }
}

export async function firebaseGetImage(id?: string) {
    const docRef = doc(db, `images/${id}`)

    const docSnapshot = await getDoc(docRef)

    const data = docSnapshot.data()

    return {
        id: docSnapshot.id,
        ...data,
        createAt: data?.createAt?.seconds,
    } as ImageData
}

export async function firebaseAddImage(
    imageName: string,
    imgDataUrl: string,
    previousData?: ImageData,
) {
    const user = auth.currentUser

    if (!user) return

    if (previousData) {
        const storageRef = ref(storage, previousData.storagePath)
        await deleteObject(storageRef)
    }

    const id = uuidv4()
    const storageRef = ref(storage, `images/${id}.png`)

    const snapshot = await uploadString(storageRef, imgDataUrl, "data_url")
    const downloadURL = await getDownloadURL(snapshot.ref)

    const imageData = {
        uid: user.uid,
        imageName: imageName,
        imageUrl: downloadURL,
        createAt: new Date(),
        userName: user?.displayName,
        userEmail: user?.email,
        storagePath: `images/${id}.png`,
    }

    const responseData = previousData
        ? await updateDoc(doc(db, `images/${previousData.id}`), imageData)
        : await addDoc(imagesRef, imageData)
    return {
        ...imageData,
        id: responseData?.id || previousData?.id,
        createAt: imageData.createAt.getMilliseconds(),
    } as ImageData
}

export async function firebaseRemoveImage(imgData: ImageData) {
    const user = auth.currentUser

    if (!user) return

    const storageRef = ref(storage, imgData.storagePath)
    const docRef = doc(db, `images/${imgData.id}`)

    await deleteDoc(docRef)
    await deleteObject(storageRef)
}
