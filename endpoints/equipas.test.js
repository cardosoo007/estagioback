import { describe, expect, test } from "vitest";
import express from "express";
import request from "supertest";
import { getequipas, equipabyid, postequipa } from "./equipas";
import equipasDB from "../DB/equipas";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/equipas", getequipas);
app.get("/equipas/:idequipa", equipabyid);
app.post("/equipas", postequipa);

describe("Equipas", () => {
  test("deve devolver a lista expectavel de equipas com paginacao", async () => {
    const result = await request(app)
      .get("/equipas?pagina=0&items=5")
      .expect(200);

    expect(result.body).toStrictEqual({
      items: equipasDB,
      total: equipasDB.length,
      length: equipasDB.length,
    });
  });
});

describe.skip("EquipasId", () => {
  test("devolve uma equipa especifica pelo ID", async () => {
    const result = await request(app)
      .get(`/equipas/${equipasDB[1].id}`)
      .expect(200);

    expect(result.body).toStrictEqual(equipasDB[1]);
  });

  test("caso passe um id nao existente devolve vazio", async () => {
    const result = await request(app).get("/equipas/999").expect(200);

    expect(result.body).toStrictEqual("");
  });
});

describe("Post Equipas", () => {
  test("caso a equipa ja exista devolve erro", async () => {
    const novaEquipa = {
      nomeEquipa: "Porto",
      nomeTreinador: "Farioli",
      idadeTreinador: 40,
      pontos: 32,
    };

    const result = await request(app)
      .post("/equipas")
      .send({ novaEquipa })
      .expect(400);

    expect(result.body).toStrictEqual({
      error: "Equipa já existe",
    });
  });
});
