import { auth, usersRef } from "@appFirebase/firebase"
import {
    doc,
    setDoc,
    updateDoc,
    increment,
    getDocs,
    orderBy,
    query,
    where,
} from "firebase/firestore"

export async function firebaseCreateUser() {
    const user = auth.currentUser

    if (!user) return

    await setDoc(doc(usersRef, user.uid), {
        userEmail: user?.email,
        imageCounter: 0,
    })
}

export async function firebaseDecrementUserImageCounter() {
    const user = auth.currentUser

    if (!user) return

    await updateDoc(doc(usersRef, user.uid), {
        imageCounter: increment(-1),
    })
}

export async function firebaseIncrementUserImageCounter() {
    const user = auth.currentUser

    if (!user) return

    await updateDoc(doc(usersRef, user.uid), {
        imageCounter: increment(1),
    })
}

export async function firebaseGetUsers() {
    const q = query(
        usersRef,
        where("imageCounter", ">", 0),
        orderBy("imageCounter", "desc"),
    )

    const docs = await getDocs(q)

    return docs.docs.map(doc => doc.data())
}
