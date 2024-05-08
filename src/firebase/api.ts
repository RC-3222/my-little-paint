import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
} from "firebase/auth"
import { auth, imagesRef } from "./firebase"

import { getDocs, orderBy, query, where } from "firebase/firestore"

export async function firebaseSignUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export async function firebaseSignIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
}

export async function firebaseSignOut() {
    return signOutFirebase(auth)
}

export async function firebaseGetData(email?: string) {
    const q = email
        ? query(
              imagesRef,
              where("userEmail", "==", email),
              orderBy("createAt", "desc"),
          )
        : query(imagesRef, orderBy("createAt", "desc"))

    const docs = await getDocs(q)

    return docs.docs.map(doc => {
        const data = doc.data()
        return { ...data, id: doc.id, createAt: data.seconds }
    })
}
