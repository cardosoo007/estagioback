import axios from "axios";
import cache from "../cache.js";

// Endpoint para devolver as classificações
export const getclassificacoes = async (req, res) => {
  try {
    // A liga vem da query string enviada pelo frontend.
    // Exemplo: /classificacoes?liga=PPL faz com que liga tenha o valor "PPL".
    const liga = req.query.liga;
    const key = `classificacoes-${liga}`;

    const dadosEmCache = cache.get(key);

    console.log("Dados em cache:", dadosEmCache);

    if (dadosEmCache) {
      console.log("cache");
      return res.json(dadosEmCache);
    }

    console.log("API");

    // Faz o pedido GET à API externa
    const response = await axios.get(
      `https://api.football-data.org/v4/competitions/${liga}/standings`,
      {
        // Envia o token de autenticação no header
        // process.env.API_KEY vem do ficheiro .env e não deve ser escrito diretamente no frontend.
        headers: {
          "X-Auth-Token": process.env.API_KEY,
        },
      },
    );

    // Vai buscar a tabela dentro da resposta da API
    const tabela = response.data.standings[0].table;

    // Transforma os dados da API para o formato usado no frontend
    const classificacoes = tabela.map((equipa) => {
      return {
        // position é a posição da equipa na tabela.
        posicao: equipa.position,

        // Este é o ID externo da football-data.
        // O frontend usa este ID no link /equipas/:id para conseguir pedir os detalhes corretos da equipa.
        equipaIdApi: equipa.team.id,

        // crest é o logotipo da equipa na API externa.
        logotipo: equipa.team.crest,

        // name é o nome oficial da equipa na API externa.
        equipa: equipa.team.name,

        // Estatísticas da classificação que a tabela mostra no frontend.
        vitorias: equipa.won,
        empates: equipa.draw,
        derrotas: equipa.lost,

        // Agrupamos os golos num objeto para o frontend conseguir usar golos.marcados e golos.sofridos.
        golos: {
          marcados: equipa.goalsFor,
          sofridos: equipa.goalsAgainst,
        },

        pontos: equipa.points,
      };
    });

    cache.set(key, classificacoes);

    res.json(classificacoes);
  } catch (error) {
    // Mostra o erro no terminal se o pedido falhar
    console.error(error);
  }
};
