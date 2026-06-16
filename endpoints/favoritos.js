import { db } from "../firebase.js";

export const getfavoritos = async (req, res) => {
  const userId = req.query.userId;

  const snapshot = await db
    .collection("favoritos")
    .where("userId", "==", userId)
    .get();

  const favoritosDoUser = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  res.json(favoritosDoUser);
};

export const postfavorito = async (request, response) => {
  const novoFavorito = request.body.novoFavorito;

  const snapshot = await db
    .collection("favoritos")
    .where("userId", "==", novoFavorito.userId)
    .where("equipaIdApi", "==", novoFavorito.equipaIdApi)
    .get();

  if (!snapshot.empty) {
    await snapshot.docs[0].ref.delete();
  } else {
    await db.collection("favoritos").add(novoFavorito);
  }

  const favoritosAtualizados = await db
    .collection("favoritos")
    .where("userId", "==", novoFavorito.userId)
    .get();

  const favoritosDoUser = favoritosAtualizados.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  response.json(favoritosDoUser);
};
