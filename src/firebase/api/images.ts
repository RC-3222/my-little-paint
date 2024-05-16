import { auth, db, imagesRef, storage } from "../firebase"

import { v4 as uuidv4 } from "uuid"

import type { Query, DocumentSnapshot } from "firebase/firestore"
import {
    addDoc,
    getDocs,
    orderBy,
    where,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
    limit,
    startAfter,
    limitToLast,
    endBefore,
    query,
} from "firebase/firestore"
import {
    ref,
    deleteObject,
    getDownloadURL,
    uploadString,
} from "firebase/storage"
import type { ImageData } from "@appShared/types"
import { MAX_IMAGES_PER_PAGE } from "@appModules/main/constants"

export type QueryDirections = "before" | "after"

type Args = {
    email?: string | null
    docId?: string | null
    queryDirection?: QueryDirections | null
}

export async function firebaseGetData({
    email,
    docId,
    queryDirection = "after",
}: Args = {}) {
    let mainQ: Query

    if (docId && queryDirection) {
        mainQ = await getQuery(docId, queryDirection, email)
    } else {
        mainQ = email
            ? query(
                  imagesRef,
                  where("userEmail", "==", email),
                  orderBy("createAt", "desc"),
                  limit(MAX_IMAGES_PER_PAGE),
              )
            : query(
                  imagesRef,
                  orderBy("createAt", "desc"),
                  limit(MAX_IMAGES_PER_PAGE),
              )
    }

    const docs = await getDocs(mainQ)

    const hasPrevPage = await hasPrevPageHelper(docs.docs[0], email)
    const hasNextPage = await hasNextPageHelper(
        docs.docs[docs.docs.length - 1],
        email,
    )

    const data = docs.docs.map(doc => {
        const data = doc.data()
        return { ...data, id: doc.id, createAt: data?.createAt?.seconds }
    }) as ImageData[]

    return {
        data,
        hasPrevPage,
        hasNextPage,
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

async function getQuery(
    docId: string,
    direction: QueryDirections,
    email?: string | null,
) {
    const docSnap = await getDoc(doc(imagesRef, docId))

    if (!docSnap.exists())
        throw new Error("Couldn't get the doc by the specified id")

    const limitConstraint = direction === "after" ? limit : limitToLast
    const docConstraint = direction === "after" ? startAfter : endBefore

    return email
        ? query(
              imagesRef,
              where("userEmail", "==", email),
              orderBy("createAt", "desc"),
              docConstraint(docSnap),
              limitConstraint(MAX_IMAGES_PER_PAGE),
          )
        : query(
              imagesRef,
              orderBy("createAt", "desc"),
              docConstraint(docSnap),
              limitConstraint(MAX_IMAGES_PER_PAGE),
          )
}

async function hasPrevPageHelper(
    firstVisibleDoc: DocumentSnapshot,
    email?: string | null,
) {
    const q = email
        ? query(
              imagesRef,
              where("userEmail", "==", email),
              orderBy("createAt", "desc"),
              endBefore(firstVisibleDoc),
              limitToLast(1),
          )
        : query(
              imagesRef,
              orderBy("createAt", "desc"),
              endBefore(firstVisibleDoc),
              limitToLast(1),
          )

    const docs = await getDocs(q)

    return docs.docs.length > 0
}

async function hasNextPageHelper(
    lastVisibleDoc: DocumentSnapshot,
    email?: string | null,
) {
    const q = email
        ? query(
              imagesRef,
              where("userEmail", "==", email),
              orderBy("createAt", "desc"),
              startAfter(lastVisibleDoc),
              limit(1),
          )
        : query(
              imagesRef,
              orderBy("createAt", "desc"),
              startAfter(lastVisibleDoc),
              limit(1),
          )

    const docs = await getDocs(q)

    return docs.docs.length > 0
}
