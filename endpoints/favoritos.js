import favoritosDB from "../DB/favoritos.js";

export const getfavoritos = (req, res) => {
  res.json(favoritosDB);
};

export const postfavorito = (request, response) => {
  const favorito = favoritosDB.find((favorito) => {
    return favorito.equipaIdApi === request.body.novoFavorito.equipaIdApi;
  });

  if (favorito) {
    const indice = favoritosDB.indexOf(favorito);
    favoritosDB.splice(indice, 1);
  } else {
    favoritosDB.push(request.body.novoFavorito);
  }

  response.json(favoritosDB);
};
