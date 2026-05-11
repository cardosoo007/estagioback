const express = require("express");
const app = express();
const port = 3000;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

app.get("/jogadores/:idjogador", (req, res) => {
  const marcadores = [
    {
      id: 5,
      nome: "Zaidu",
      idade: 27,
      posicao: "Avançado",
      equipa: "Porto",
      golos: 18,
    },
    {
      id: 6,
      nome: "Suarez",
      idade: 27,
      posicao: "Avançado",
      equipa: "Sporting",
      golos: 15,
    },
    {
      id: 2,
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
  ];

  const jogador = marcadores.find(
    (marcador) => marcador.id == req.params.idjogador,
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
  console.log(request.body.novaEquipa.nomeEquipa);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
