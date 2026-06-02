import axios from "axios";

// Endpoint para devolver as classificações
export const getclassificacoes = async (req, res) => {
  try {
    const liga = req.query.liga;
    // Faz o pedido GET à API externa
    const response = await axios.get(
      `https://api.football-data.org/v4/competitions/${liga}/standings`,
      {
        // Envia o token de autenticação no header
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
        posicao: equipa.position,
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

    // Envia as classificações para o frontend
    res.json(classificacoes);
  } catch (error) {
    // Mostra o erro no terminal se o pedido falhar
    console.error(error);
  }
};
