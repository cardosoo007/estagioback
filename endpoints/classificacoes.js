import axios from "axios";
import cache from "../cache.js";

// Endpoint responsável por devolver a classificação de uma liga.
// A rota recebe a liga via query string, por exemplo: /classificacoes?liga=PPL.
export const getclassificacoes = async (req, res) => {
  try {
    // A liga é recebida via query string e define qual competição deve ser consultada.
    // Exemplo: /classificacoes?liga=PPL indica que o backend deve buscar a tabela da liga PPL.
    const liga = req.query.liga;
    const key = `classificacoes-${liga}`;

    // Procura primeiro na cache para não repetir pedidos à API externa.
    // Se a resposta já existir para esta liga, ela é devolvida imediatamente.
    const dadosEmCache = cache.get(key);

    if (dadosEmCache) {
      return res.json(dadosEmCache);
    }

    // Faz o pedido à football-data.org para obter a tabela da competição pedida.
    const response = await axios.get(
      `https://api.football-data.org/v4/competitions/${liga}/standings`,
      {
        headers: {
          "X-Auth-Token": process.env.API_KEY,
        },
      },
    );

    // A API devolve a tabela dentro de response.data.standings[0].table.
    // Esta parte do objeto contém a lista completa de posições e estatísticas da competição.
    const tabela = response.data.standings[0].table;

    // Mapeia os dados da API para um formato mais simples e útil para o frontend.
    // O objetivo é reduzir a complexidade da resposta original e deixar a estrutura mais intuitiva para consumo.
    const classificacoes = tabela.map((equipa) => {
      return {
        posicao: equipa.position,
        equipaIdApi: equipa.team.id,
        logotipo: equipa.team.crest,
        equipa: equipa.team.name,
        vitorias: equipa.won,
        empates: equipa.draw,
        derrotas: equipa.lost,
        golos: {
          marcados: equipa.goalsFor,
          sofridos: equipa.goalsAgainst,
        },
        pontos: equipa.points,
      };
    });

    // Armazena o resultado já tratado em cache para futuras requisições da mesma liga.
    cache.set(key, classificacoes);

    res.json(classificacoes);
  } catch (error) {
    console.error(error);
  }
};
