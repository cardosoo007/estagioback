import equipasDB from "../DB/equipas.js";
import jogadoresDB from "../DB/jogadores.js";
// Axios permite ao backend fazer pedidos HTTP para APIs externas.
import axios from "axios";

export const getequipas = (req, res) => {
  // pagina e items vêm da query string.
  // Exemplo: /equipas?pagina=0&items=5
  const pagina = req.query.pagina;
  const items = req.query.items;

  // Calcula o intervalo de equipas a devolver nesta página.
  const start = pagina * items;
  const end = start + items;

  // Vai buscar só uma parte da lista, para fazer paginação.
  const resultado = equipasDB.slice(start, end);

  // Estrutura enviada ao frontend: items é a lista desta página e total é o total de equipas existentes.
  const devolver = {
    items: resultado,
    total: equipasDB.length,
    length: resultado.length,
  };

  res.json(devolver);
};

// Devolve uma equipa específica pelo ID
export const equipabyid = async (req, res) => {
  // idequipa vem da rota /equipas/:idequipa.
  // Exemplo: se o frontend chamar /equipas/503, req.params.idequipa vale "503".
  // Este ID deve ser o ID externo da football-data, não o ID da nossa base de dados.
  const response = await axios.get(
    `https://api.football-data.org/v4/teams/${req.params.idequipa}`,
    {
      // O token é enviado no backend para não ficar exposto no browser.
      headers: {
        "X-Auth-Token": process.env.API_KEY,
      },
    },
  );

  // Envia para o frontend os detalhes da equipa exatamente como vieram da football-data.
  res.json(response.data);
};

// Devolve os jogadores de uma equipa específica
export const jogadorporequipa = (req, res) => {
  // Esta função ainda usa a base de dados antiga.
  // Na nova página de detalhes da equipa, os jogadores já vêm da football-data dentro de equipa.squad.

  // Procura a equipa pelo ID
  const equipa = equipasDB.find((equipa) => equipa.id == req.params.idequipa);

  // Procura os jogadores dessa equipa
  const jogadores = jogadoresDB.filter(
    (jogador) => jogador.equipa.toLowerCase() === equipa.equipa.toLowerCase(),
  );

  console.log(jogadores); // Debug

  // Devolve os jogadores encontrados
  res.json(jogadores);
};

// Adiciona uma nova equipa
export const postequipa = (request, response) => {
  const jaExiste = equipasDB.some((equipa) => {
    return (
      equipa.equipa.toLowerCase() ===
      request.body.novaEquipa.nomeEquipa.toLowerCase()
    );
  });
  console.log(request.body);
  if (jaExiste) {
    return response.status(400).json({ error: "Equipa já existe" });
  }

  console.log(request.body.novaEquipa.nomeEquipa); // Imprime os dados recebidos
  equipasDB.push({
    id: uuidv4(),
    equipa: request.body.novaEquipa.nomeEquipa,
    treinador: {
      nome: request.body.novaEquipa.nomeTreinador,
      idade: request.body.novaEquipa.idadeTreinador,
    },
    pontos: request.body.novaEquipa.pontos,
  });
  response.json({});
};
