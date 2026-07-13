import { db } from "../firebase.js";

// Lista os favoritos de um utilizador específico a partir da coleção Firestore.
// O frontend envia o userId via query string e o backend devolve as equipas marcadas como favoritas.
export const getfavoritos = async (req, res) => {
  // O userId é passado pelo frontend para identificar qual utilizador está a pedir os seus favoritos.
  // Esta informação é usada na consulta ao Firestore para devolver apenas os registos pertencentes a esse utilizador.
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

// Cria ou remove um favorito.
// Se já existir, a função faz toggle e elimina o registo; se não existir, cria um novo documento na coleção favoritos.
export const postfavorito = async (request, response) => {
  // O corpo do pedido contém o objeto novoFavorito com a informação do utilizador e da equipa.
  // Esta rota funciona como um toggle: se o favorito já existir, ele é removido; se não existir, é criado.
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
