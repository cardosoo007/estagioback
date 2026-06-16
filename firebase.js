import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";
import key from "./firebasekey.json" with { type: "json" };

initializeApp({
  credential: cert(key),
});

const db = getFirestore();

const docRef = db.collection("users").doc("alovelace");

await docRef.set({
  first: "Ada",
  last: "Lovelace",
  born: 1815,
});
