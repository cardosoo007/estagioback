import equipasDB from "../DB/equipas.js";
import jogadoresDB from "../DB/jogadores.js";
import { v4 as uuidv4 } from "uuid";

export const getjogadores = (req, res) => {
  res.json(jogadoresDB);
};

export const jogadorbyid = (req, res) => {
  // Procura o jogador com o ID recebido na URL
  const jogador = jogadoresDB.find(
    (jogador) => jogador.id == req.params.idjogador,
  );
  console.log(jogador); // Imprime na consola para debug
  res.json(jogador); // Devolve o jogador encontrado
};

// Adiciona um novo jogador
export const postjogador = (request, response) => {
  console.log("body: ", request.body);
  // Verifica se já existe um jogador com o mesmo nome
  const jaExiste = jogadoresDB.some((jogador) => {
    // Compara o nome do jogador da base de dados
    // com o nome recebido do formulário
    return (
      jogador.nome.toLowerCase() ===
      request.body.novoJogador.nomeJogador.toLowerCase()
    );
  });

  // Se já existir, devolve erro e não adiciona
  if (jaExiste) {
    return response.status(400).json({
      error: "Jogador já existe",
    });
  }

  // Mostra no terminal o nome recebido
  console.log(request.body.novoJogador.nomeJogador);

  // Adiciona o novo jogador ao array jogadoresDB
  jogadoresDB.push({
    // Cria um id único automaticamente
    id: uuidv4(),

    // Guarda os dados recebidos do frontend
    nome: request.body.novoJogador.nomeJogador,
    idade: request.body.novoJogador.idadeJogador,
    posicao: request.body.novoJogador.posicao,
    equipa: request.body.novoJogador.nomeEquipa,
    golos: request.body.novoJogador.golos,
  });

  // Envia resposta de sucesso
  response.json({});
};
