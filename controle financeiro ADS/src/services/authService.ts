import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { DEFAULT_CURRENCY } from "../constants/finance";
import { auth, db } from "./firebase";
import type { UserProfile } from "../types";

export async function registerUser(name: string, email: string, password: string) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: name });
  await ensureUserProfileDocument(credential.user, name, email);

  return credential.user;
}

export async function loginUser(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export async function getUserProfile(user: User): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(db, "users", user.uid));

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    uid: data.uid,
    name: data.name,
    email: data.email,
    currency: data.currency ?? DEFAULT_CURRENCY,
    createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString()
  };
}

export async function ensureUserProfileDocument(
  user: User,
  fallbackName?: string,
  fallbackEmail?: string
) {
  const profileRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(profileRef);

  if (snapshot.exists()) {
    return;
  }

  await setDoc(profileRef, {
    uid: user.uid,
    name: fallbackName ?? user.displayName ?? "Usuario",
    email: fallbackEmail ?? user.email ?? "",
    currency: DEFAULT_CURRENCY,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}
