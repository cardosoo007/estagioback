import { v4 as uuidv4 } from "uuid";
import { describe, expect, test, vi } from "vitest";
import express from "express";
import request from "supertest";
import { getjogadores, jogadorbyid, postjogador } from "./jogadores";
import jogadoresDB from "../DB/jogadores";
import equipasDB from "../DB/equipas";
import TestAgent from "supertest/lib/agent";

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/getJogadores", getjogadores);
app.get("/jogadorbyid/:idjogador", jogadorbyid);
app.post("/postjogador", postjogador);

describe("Jogadores", () => {
  test("deve devolver a lista expectavel de jogadores", async () => {
    const result = await request(app).get("/getJogadores").expect(200);

    expect(result.body).toStrictEqual(jogadoresDB);
  });
});

describe("JogadoresId", () => {
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

  test("// Caso passe um id nao existente devolve vazio", async () => {
    const result = await request(app).get("/jogadorbyid/999").expect(200);

    expect(result.body).toStrictEqual("");
  });
});

describe("Post Jogadores", () => {
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
  test("caso o jogador nao exista adiciona com sucesso", async () => {
    const novoJogador = {
      nomeJogador: "Teste Novo",
      idadeJogador: 21,
      posicao: "Medio",
      nomeEquipa: "Benfica",
      golos: 2,
    };

    const result = await request(app)
      .post("/postjogador")
      .send({ novoJogador })
      .expect(200);

    expect(result.body).toStrictEqual({});
  });
});
