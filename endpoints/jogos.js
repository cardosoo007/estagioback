import axios from "axios";
import cache from "../cache.js";

// Endpoint que devolve os jogos de uma liga.
// A resposta é simplificada para o frontend, mantendo apenas a informação mais útil.
export const getjogos = async (req, res) => {
  try {
    // A liga é recebida pela query string e define a competição de que se querem conhecer os jogos.
    // Este valor é usado para montar a URL da API externa e para construir a chave de cache.
    const liga = req.query.liga;
    const key = `jogos-${liga}`;

    // Procura os dados em cache antes de chamar a API externa.
    // Se já existir uma resposta guardada para esta competição, ela é usada diretamente.
    const dadosEmCache = cache.get(key);

    if (dadosEmCache) {
      return res.json(dadosEmCache);
    }

    // Pede os jogos da competição escolhida à API externa.
    const response = await axios.get(
      `https://api.football-data.org/v4/competitions/${liga}/matches`,
      {
        headers: {
          "X-Auth-Token": process.env.API_KEY,
        },
      },
    );

    // Transformação da resposta da API para um formato mais direto e fácil de consumir.
    // O backend simplifica os campos da resposta original para deixar a informação mais limpa para o frontend.
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

    // Guarda a resposta já tratada para evitar pedidos repetidos.
    cache.set(key, jogos);

    res.json(jogos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar jogos" });
  }
};
