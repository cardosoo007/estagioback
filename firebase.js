import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import key from "./firebasekey.json" with { type: "json" };

// Inicializa o Firebase Admin SDK uma única vez para todo o projeto.
// Isto permite usar o Firestore com permissões de backend, sem depender do cliente web e sem expor credenciais no frontend.
initializeApp({
  credential: cert(key),
});

// Instância global do Firestore.
// Os endpoints de favoritos usam esta ligação para ler e escrever documentos na coleção favoritos.
export const db = getFirestore();
