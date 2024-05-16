import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
} from "firebase/auth"
import { auth } from "../firebase"

export async function firebaseSignUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export async function firebaseSignIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
}

export async function firebaseSignOut() {
    return signOutFirebase(auth)
}
