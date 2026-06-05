// Importações necessárias para os testes
import { describe, expect, test } from "vitest"; // Framework de testes
import express from "express"; // Framework web
import request from "supertest"; // Para fazer requests HTTP nos testes
import { getmarcadores } from "./marcadores"; // Função a testar
import jogadoresDB from "../DB/jogadores"; // Base de dados de jogadores (para verificar resultados)

// Criar uma aplicação Express para simular o servidor nos testes
const app = express();

// Definir a rota que vamos testar
app.get("/getmarcadores", getmarcadores); // Rota para obter a tabela de marcadores (ordenada por golos)

// Grupo de testes para a rota GET /getmarcadores (obter tabela de marcadores)
describe("Marcadores", () => {
  // Teste: Verificar se a rota retorna os jogadores ordenados por número de golos (descendente)
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
  test("deve devolver dois marcadores quando items e 2", async () => {
    const result = await request(app)
      .get("/getmarcadores?pagina=0&items=2")
      .expect(200);

    expect(result.body.length).toStrictEqual(2);
  });
});
