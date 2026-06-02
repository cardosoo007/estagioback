import equipasDB from "../DB/equipas.js";
import jogadoresDB from "../DB/jogadores.js";

export const getmarcadores = (req, res) => {
  const pagina = req.query.pagina;
  const items = req.query.items;
  const marcadores = jogadoresDB
    .filter((jogador) => jogador.golos > 0)
    .sort((jogador1, jogador2) => jogador2.golos - jogador1.golos);

  const start = pagina * items;
  const end = start + items;
  const resultado = marcadores.slice(start, end);

  const resposta = {
    items: resultado,
    total: marcadores.length,
    length: resultado.length,
  };

  res.json(resposta);
};
