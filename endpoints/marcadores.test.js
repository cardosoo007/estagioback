import { describe, expect, test } from "vitest";
import express from "express";
import request from "supertest";
import { getmarcadores } from "./marcadores";
import jogadoresDB from "../DB/jogadores";

const app = express();

app.get("/getmarcadores", getmarcadores);

describe("Marcadores", () => {
  test("deve devolver os marcadores por ordem de golos", async () => {
    const result = await request(app)
      .get("/getmarcadores?pagina=0&items=5")
      .expect(200);

    const marcadoresEsperados = jogadoresDB
      .filter((jogador) => jogador.golos > 0)
      .sort((jogador1, jogador2) => jogador2.golos - jogador1.golos)
      .slice(0, 5);

    expect(result.body).toStrictEqual({
      items: marcadoresEsperados,
      total: 8,
      length: 5,
    });
  });
});
