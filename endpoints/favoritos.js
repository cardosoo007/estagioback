import { db } from "../firebase.js";

export const getfavoritos = async (req, res) => {
  const userId = req.query.userId;

  const snapshot = await db
    .collection("favoritos")
    .where("userId", "==", userId)
    .get();

  const favoritosDoUser = snapshot.docs.map((doc) => {
    const favorito = doc.data();
    return {
      id: doc.id,
      userId: favorito.userId,
      equipaIdApi: favorito.equipaIdApi,
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
    const favoritoCriado = await db.collection("favoritos").add(novoFavorito);

    return response.json({
      id: favoritoCriado.id,
      userId: novoFavorito.userId,
      equipaIdApi: novoFavorito.equipaIdApi,
    });
  }

  response.json(novoFavorito);
};
