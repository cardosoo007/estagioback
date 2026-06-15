import favoritosDB from "../DB/favoritos.js";

export const getfavoritos = (req, res) => {
  const userId = req.query.userId;

  const favoritosDoUser = favoritosDB.filter((favorito) => {
    return favorito.userId === userId;
  });

  res.json(favoritosDoUser);
};

export const postfavorito = (request, response) => {
  const indice = favoritosDB.findIndex((favorito) => {
    return (
      favorito.userId === request.body.novoFavorito.userId &&
      favorito.equipaIdApi === request.body.novoFavorito.equipaIdApi
    );
  });

  if (indice !== -1) {
    favoritosDB.splice(indice, 1);
  } else {
    favoritosDB.push(request.body.novoFavorito);
  }

  const favoritosDoUser = favoritosDB.filter((favorito) => {
    return favorito.userId === request.body.novoFavorito.userId;
  });

  response.json(favoritosDoUser);
};
