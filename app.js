// Importar bibliotecas
import express from "express";
import { v4 as uuidv4 } from "uuid"; // Para gerar IDs únicos

// Criar aplicação Express
const app = express();
const port = 3000;

// Middleware para processar dados JSON e formulários
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// ===== ENDPOINTS GET =====

// Devolve as classificações das equipas
app.get("/classificacoes", (req, res) => {
  const classificacoes = [
    { equipa: "Benfica", pontos: 30 },
    { equipa: "Porto", pontos: 32 },
    { equipa: "Sporting", pontos: 27 },
  ];
  res.json(classificacoes);
});

// Devolve todas as equipas
app.get("/equipas", (req, res) => {
  res.json(equipasDB);
});

// Devolve a lista de marcadores
app.get("/marcadores", (req, res) => {
  console.log(req.query.pagina);
  const pagina = req.query.pagina;
  const items = req.query.items;
  const marcadores = jogadoresDB
    .filter((jogador) => jogador.golos > 0)
    .sort((jogador1, jogador2) => jogador2.golos - jogador1.golos);

  const start = pagina * items;
  const end = start + items;
  const resultado = marcadores.slice(start, end);

  const devolver = {
    items: resultado,
    total: marcadores.length,
    length: resultado.length,
  };

  res.json(devolver);
});
// Devolve todos os jogadores
app.get("/jogadores", (req, res) => {
  res.json(jogadoresDB);
});

// Base de dados dos jogadores
const jogadoresDB = [
  {
    id: uuidv4(),
    nome: "Zaidu",
    idade: 27,
    posicao: "Avançado",
    equipa: "Porto",
    golos: 18,
  },
  {
    id: uuidv4(),
    nome: "Suarez",
    idade: 27,
    posicao: "Avançado",
    equipa: "Sporting",
    golos: 15,
  },
  {
    id: uuidv4(),
    nome: "Rafa",
    idade: 31,
    posicao: "Avançado",
    equipa: "Benfica",
    golos: 12,
  },
  {
    id: uuidv4(),
    nome: "Kiwior",
    idade: 24,
    posicao: "Defesa",
    equipa: "Porto",
    golos: 0,
  },
  {
    id: uuidv4(),
    nome: "Otávio",
    idade: 29,
    posicao: "Médio",
    equipa: "Porto",
    golos: 5,
  },
  {
    id: uuidv4(),
    nome: "Doumbia",
    idade: 26,
    posicao: "Avançado",
    equipa: "Sporting",
    golos: 9,
  },
  {
    id: uuidv4(),
    nome: "Paulista",
    idade: 30,
    posicao: "Defesa",
    equipa: "Sporting",
    golos: 1,
  },
  {
    id: uuidv4(),
    nome: "Otamendi",
    idade: 34,
    posicao: "Defesa",
    equipa: "Benfica",
    golos: 2,
  },
  {
    id: uuidv4(),
    nome: "Grimaldo",
    idade: 28,
    posicao: "Lateral",
    equipa: "Benfica",
    golos: 7,
  },
];

// Devolve um jogador específico pelo ID
app.get("/jogadores/:idjogador", (req, res) => {
  const marcadores = [
    {
      id: 1,
      nome: "Zaidu",
      idade: 27,
      posicao: "Avançado",
      equipa: "Porto",
      golos: 18,
    },
    {
      id: 2,
      nome: "Suarez",
      idade: 27,
      posicao: "Avançado",
      equipa: "Sporting",
      golos: 15,
    },
    {
      id: 3,
      nome: "Rafa",
      idade: 31,
      posicao: "Avançado",
      equipa: "Benfica",
      golos: 12,
    },
    {
      id: 4,
      nome: "Kiwior",
      idade: 24,
      posicao: "Defesa",
      equipa: "Porto",
      golos: 10,
    },
    {
      id: 5,
      nome: "Otávio",
      idade: 29,
      posicao: "Médio",
      equipa: "Porto",
      golos: 5,
    },
    {
      id: 6,
      nome: "Doumbia",
      idade: 26,
      posicao: "Avançado",
      equipa: "Sporting",
      golos: 9,
    },
    {
      id: 7,
      nome: "Paulista",
      idade: 30,
      posicao: "Defesa",
      equipa: "Sporting",
      golos: 1,
    },
    {
      id: 8,
      nome: "Otamendi",
      idade: 34,
      posicao: "Defesa",
      equipa: "Benfica",
      golos: 2,
    },
    {
      id: 9,
      nome: "Grimaldo",
      idade: 28,
      posicao: "Lateral",
      equipa: "Benfica",
      golos: 7,
    },
  ];

  // Procura o jogador com o ID recebido na URL
  const jogador = jogadoresDB.find(
    (jogador) => jogador.id == req.params.idjogador,
  );
  console.log(jogador); // Imprime na consola para debug
  res.json(jogador); // Devolve o jogador encontrado
});

// Base de dados das equipas
const equipasDB = [
  {
    id: uuidv4(),
    equipa: "Benfica",
    treinador: { nome: "Jose Mourinho", idade: 57 },
    pontos: 30,
  },

  {
    id: uuidv4(),
    equipa: "Porto",
    treinador: { nome: "Farioli", idade: 40 },
    pontos: 32,
  },
  {
    id: uuidv4(),
    equipa: "Sporting",
    treinador: { nome: "Rúben Amorim", idade: 39 },
    pontos: 27,
  },
  {
    id: uuidv4(),
    equipa: "Valonguese",
    treinador: { nome: "Joao Sousa", idade: 60 },
    pontos: 27,
  },
];

// Devolve uma equipa específica pelo ID
app.get("/equipas/:idequipa", (req, res) => {
  const equipa = equipasDB.find((equipa) => equipa.id == req.params.idequipa);
  console.log(equipa); // Debug
  res.json(equipa);
});

// Devolve os jogadores de uma equipa específica
app.get("/equipas/:idequipa/jogadores", (req, res) => {
  // Procura a equipa pelo ID
  const equipa = equipasDB.find((equipa) => equipa.id == req.params.idequipa);

  // Procura os jogadores dessa equipa
  const jogadores = jogadoresDB.filter(
    (jogador) => jogador.equipa.toLowerCase() === equipa.equipa.toLowerCase(),
  );

  console.log(jogadores); // Debug

  // Devolve os jogadores encontrados
  res.json(jogadores);
});

// ===== ENDPOINTS POST =====

// Adiciona uma nova equipa
app.post("/equipas", (request, response) => {
  const jaExiste = equipasDB.some((equipa) => {
    return (
      equipa.equipa.toLowerCase() ===
      request.body.novaEquipa.nomeEquipa.toLowerCase()
    );
  });
  console.log(jaExiste);
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
});

// Adiciona um novo jogador
app.post("/jogadores", (request, response) => {
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
});

// Inicia o servidor na porta 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
