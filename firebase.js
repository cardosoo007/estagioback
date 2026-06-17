import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import key from "./firebasekey.json" with { type: "json" };

initializeApp({
  credential: cert(key),
});

export const db = getFirestore();
