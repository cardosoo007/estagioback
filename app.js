const express = require("express");
const app = express();
const port = 3000;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
import { v4 as uuidv4 } from "uuid";
//endpoints

app.get("/classificacoes", (req, res) => {
  const classificacoes = [
    { equipa: "Benfica", pontos: 30 },
    { equipa: "Porto", pontos: 32 },
    { equipa: "Sporting", pontos: 27 },
  ];
  res.json(classificacoes);
});
app.get("/equipas", (req, res) => {
  res.json(equipasDB);
});

app.get("/marcadores", (req, res) => {
  const marcadores = [
    { id: 5, jogador: "Zaidu", equipa: "Porto", golos: 18 },
    { id: 6, jogador: "Suarez", equipa: "Sporting", golos: 15 },
    { id: 2, jogador: "Rafa", equipa: "Benfica", golos: 12 },
    { id: 4, jogador: "Kiwior", equipa: "Porto", golos: 10 },
  ];

  res.json(marcadores);
});

app.get("/jogadores", (req, res) => {
  res.json(jogadoresDB);
});

const jogadoresDB = [
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

  const jogador = jogadoresDB.find(
    (jogador) => jogador.id == req.params.idjogador,
  );
  console.log(jogador);
  res.json(jogador);
});

const equipasDB = [
  {
    id: 1,
    equipa: "Benfica",
    treinador: { nome: "Jose Mourinho", idade: 57 },
    pontos: 30,
  },

  {
    id: 2,
    equipa: "Porto",
    treinador: { nome: "Farioli", idade: 40 },
    pontos: 32,
  },
  {
    id: 3,
    equipa: "Sporting",
    treinador: { nome: "Rúben Amorim", idade: 39 },
    pontos: 27,
  },
  {
    id: 4,
    equipa: "Valonguese",
    treinador: { nome: "Joao Sousa", idade: 60 },
    pontos: 27,
  },
];

app.get("/equipas/:idequipa", (req, res) => {
  const equipa = equipasDB.find((equipa) => equipa.id == req.params.idequipa);
  console.log(equipa);
  res.json(equipa);
});

app.post("/equipas", (request, response) => {
  console.log(request.body);
  equipasDB.push({
    id: 5,
    equipa: request.body.novaEquipa.nomeEquipa,
    treinador: {
      nome: request.body.novaEquipa.nomeTreinador,
      idade: request.body.novaEquipa.idadeTreinador,
    },
    pontos: request.body.novaEquipa.pontos,
  });
  response.json({});
});

app.post("/jogadores", (request, response) => {
  console.log(request.body.novoJogador.nomeJogador);
  jogadoresDB.push({
    id: 1,
    nome: request.body.nomeJogador,
    idade: request.body.idadeJogador,
    posicao: request.body.posicao,
    equipa: request.body.equipaJogador,
    golos: request.body.golos,
  });
  response.json({});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
