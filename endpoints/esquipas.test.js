// Importações necessárias para os testes
import { describe, expect, test } from "vitest"; // Framework de testes
import express from "express"; // Framework web
import request from "supertest"; // Para fazer requests HTTP nos testes
import {
  getequipas, // Função para obter todas as equipas
  equipabyid, // Função para obter uma equipa específica
  jogadorporequipa, // Função para obter jogadores de uma equipa
  postequipa, // Função para adicionar uma nova equipa
} from "./equipas"; // Endpoints a testar
import equipasDB from "../DB/equipas"; // Base de dados de equipas

// Criar uma aplicação Express para simular o servidor nos testes
const app = express();

// Middleware para processar dados JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definir as rotas que vamos testar
app.get("/getequipas", getequipas); // Rota para obter todas as equipas (com paginação)
app.get("/equipabyid/:idequipa", equipabyid); // Rota para obter uma equipa específica pelo ID
app.get("/jogadorporequipa/:idequipa", jogadorporequipa); // Rota para obter jogadores de uma equipa
app.post("/postequipa", postequipa); // Rota para adicionar uma nova equipa

// Grupo de testes para a rota GET /getequipas (obter todas as equipas)
describe("Equipas", () => {
  // Teste: Verificar se a rota retorna as equipas com paginação correta
  test("deve devolver a lista expectavel de equipas com paginacao", async () => {
    const result = await request(app)
      .get("/getequipas?pagina=0&items=5")
      .expect(200);

    expect(result.body).toStrictEqual({
      items: equipasDB,
      total: equipasDB.length,
      length: equipasDB.length,
    });
  });
});

// Grupo de testes para a rota GET /equipabyid/:idequipa (obter equipa por ID)
describe("EquipasId", () => {
  // Teste: Verificar se conseguimos obter uma equipa específica usando o seu ID
  test("devolve uma equipa especifica pelo ID", async () => {
    const result = await request(app)
      .get(`/equipabyid/${equipasDB[1].id}`)
      .expect(200);

    expect(result.body).toStrictEqual(equipasDB[1]);
  });

  // Teste: Verificar o comportamento quando o ID não existe (deve devolver vazio)
  test("caso passe um id nao existente devolve vazio", async () => {
    const result = await request(app).get("/equipabyid/999").expect(200);

    expect(result.body).toStrictEqual("");
  });
});

// Grupo de testes para a rota POST /postequipa (adicionar uma nova equipa)
describe("Post Equipas", () => {
  // Teste: Verificar se o sistema rejeita uma equipa que já existe
  test("caso a equipa ja exista devolve erro", async () => {
    const novaEquipa = {
      nomeEquipa: "Porto",
      nomeTreinador: "Farioli",
      idadeTreinador: 40,
      pontos: 32,
    };

    const result = await request(app)
      .post("/postequipa")
      .send({ novaEquipa })
      .expect(400);

    expect(result.body).toStrictEqual({
      error: "Equipa já existe",
    });
  });
  test("caso a equipa exista em minusculas devolve erro", async () => {
    const novaEquipa = {
      nomeEquipa: "benfica",
    };

    const result = await request(app)
      .post("/postequipa")
      .send({ novaEquipa })
      .expect(400);

    expect(result.body).toStrictEqual({
      error: "Equipa já existe",
    });
  });
});
