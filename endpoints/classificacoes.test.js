import { describe, expect, test, beforeEach } from "vitest";
import express from "express";
import request from "supertest";
import cache from "../cache.js";
import { getclassificacoes } from "./classificacoes.js";

const app = express();

app.get("/classificacoes", getclassificacoes);

describe("Classificacoes", () => {
  beforeEach(() => {
    cache.clear();
  });

  test("devolve dados da cache", async () => {
    const dados = [
      {
        posicao: 1,
        equipa: "FC Porto",
      },
    ];

    cache.set("classificacoes-PPL", dados);

    const result = await request(app)
      .get("/classificacoes?liga=PPL")
      .expect(200);

    expect(result.body).toStrictEqual(dados);
  });

  test("nao deve devolver cache de outra liga", async () => {
    cache.clear();

    const dados = [
      {
        posicao: 1,
        equipa: "FC Porto",
      },
    ];

    cache.set("classificacoes-PPL", dados);

    const dadosEmCache = cache.get("classificacoes-PL");

    expect(dadosEmCache).toBeUndefined();
  });
});
