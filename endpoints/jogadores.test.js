// Importações necessárias para os testes
import { v4 as uuidv4 } from "uuid"; // Para gerar IDs únicos
import { describe, expect, test, vi } from "vitest"; // Framework de testes
import express from "express"; // Framework web
import request from "supertest"; // Para fazer requests HTTP nos testes
import { getjogadores, jogadorbyid, postjogador } from "./jogadores"; // Endpoints a testar
import jogadoresDB from "../DB/jogadores"; // Base de dados de jogadores
import equipasDB from "../DB/equipas"; // Base de dados de equipas
import TestAgent from "supertest/lib/agent";

// Criar uma aplicação Express para simular o servidor nos testes
const app = express();

// Middleware para processar dados JSON e URL-encoded
app.use(express.json()); // para parsing de application/json
app.use(express.urlencoded({ extended: true })); // para parsing de application/x-www-form-urlencoded

// Definir as rotas que vamos testar
app.get("/getJogadores", getjogadores); // Rota para obter todos os jogadores
app.get("/jogadorbyid/:idjogador", jogadorbyid); // Rota para obter um jogador específico pelo ID
app.post("/postjogador", postjogador); // Rota para adicionar um novo jogador

// Grupo de testes para a rota GET /getJogadores (obter todos os jogadores)
describe("Jogadores", () => {
  // Teste: Verificar se a rota retorna a lista completa de jogadores
  test("deve devolver a lista expectavel de jogadores", async () => {
    const result = await request(app).get("/getJogadores").expect(200);

    expect(result.body).toStrictEqual(jogadoresDB);
  });
});

// Grupo de testes para a rota GET /jogadorbyid/:idjogador (obter jogador por ID)
describe("JogadoresId", () => {
  // Teste: Verificar se conseguimos obter um jogador específico usando o seu ID
  test("// Devolve um jogador específico pelo ID", async () => {
    const result = await request(app)
      .get(`/jogadorbyid/${jogadoresDB[3].id}`)
      .expect(200);

    expect(result.body).toStrictEqual({
      id: jogadoresDB[3].id,
      nome: "Kiwior",
      idade: 24,
      posicao: "Defesa",
      equipa: "Porto",
      golos: 0,
    });
  });

  // Teste: Verificar o comportamento quando o ID não existe (deve devolver vazio)
  test("// Caso passe um id nao existente devolve vazio", async () => {
    const result = await request(app).get("/jogadorbyid/999").expect(200);

    expect(result.body).toStrictEqual("");
  });
  test("deve devolver o primeiro jogador pelo ID", async () => {
    const result = await request(app)
      .get(`/jogadorbyid/${jogadoresDB[0].id}`)
      .expect(200);

    expect(result.body).toStrictEqual(jogadoresDB[0]);
  });
});

// Grupo de testes para a rota POST /postjogador (adicionar um novo jogador)
describe("Post Jogadores", () => {
  // Teste: Verificar se o sistema rejeita um jogador que já existe
  test("caso o jogador já exista devolve erro", async () => {
    const novoJogador = {
      nomeJogador: "Kiwior",
      idadeJogador: 24,
      posicao: "Defesa",
      nomeEquipa: "Porto",
      golos: 0,
    };
    const result = await request(app)
      .post("/postjogador")
      .send({ novoJogador })
      .expect(400);

    expect(result.body).toStrictEqual({ error: "Jogador já existe" });
  });
  // Teste: Verificar se o sistema é case-insensitive (maiúsculas) ao procurar duplicados
  test("caso o jogador exista em letras maiusculas devolve o erro", async () => {
    const novoJogador = {
      nomeJogador: "KIWIOR",
      idadeJogador: 24,
      posicao: "Defesa",
      nomeEquipa: "Porto",
      golos: 0,
    };
    const result = await request(app)
      .post("/postjogador")
      .send({ novoJogador })
      .expect(400);

    expect(result.body).toStrictEqual({ error: "Jogador já existe" });
  });
  // Teste: Verificar se o sistema é case-insensitive (minúsculas) ao procurar duplicados
  test("caso o jogador exista em letras minusculas devolve o erro", async () => {
    const novoJogador = {
      nomeJogador: "kiwior",
      idadeJogador: 24,
      posicao: "Defesa",
      nomeEquipa: "Porto",
      golos: 0,
    };
    const result = await request(app)
      .post("/postjogador")
      .send({ novoJogador })
      .expect(400);

    expect(result.body).toStrictEqual({ error: "Jogador já existe" });
  });
  // Teste: Verificar se conseguimos adicionar um novo jogador com sucesso
  test("caso o jogador nao exista adiciona com sucesso", async () => {
    const novoJogador = {
      nomeJogador: "Lewandowski",
      idadeJogador: 37,
      posicao: "Avançado",
      nomeEquipa: "Porto",
      golos: 2,
    };

    const result = await request(app)
      .post("/postjogador")
      .send({ novoJogador })
      .expect(200);

    expect(result.body).toStrictEqual({});
  });
});
