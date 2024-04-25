import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
} from "firebase/auth"
import { auth } from "./firebase"

export async function signUpWithEmailAndPass(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export async function signInWithEmailAndPass(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
}

export async function signOut() {
    return signOutFirebase(auth)
}
