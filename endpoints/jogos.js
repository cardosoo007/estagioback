import axios from "axios";
import cache from "../cache.js";

export const getjogos = async (req, res) => {
  try {
    const liga = req.query.liga;
    const key = `jogos-${liga}`;

    const dadosEmCache = cache.get(key);

    if (dadosEmCache) {
      return res.json(dadosEmCache);
    }

    const response = await axios.get(
      `https://api.football-data.org/v4/competitions/${liga}/matches`,
      {
        headers: {
          "X-Auth-Token": process.env.API_KEY,
        },
      },
    );

    const jogos = response.data.matches.map((jogo) => {
      return {
        id: jogo.id,
        data: jogo.utcDate.slice(0, 10),
        hora: jogo.utcDate.slice(11, 16),
        casa: jogo.homeTeam.name,
        fora: jogo.awayTeam.name,
        estado: jogo.status,
        resultadoCasa: jogo.score.fullTime.home,
        resultadoFora: jogo.score.fullTime.away,
      };
    });

    cache.set(key, jogos);

    res.json(jogos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar jogos" });
  }
};
