import { describe, expect, test } from "vitest";
import express from "express";
import request from "supertest";

// Teste simples para verificar o comportamento de um middleware de logging.
// O objetivo é demonstrar que o middleware intercepta o pedido antes do handler final.
describe("Middleware mostrarPedido", () => {
  test("faz console.log quando recebe um request", async () => {
    const app = express();

    let mensagem = "";
    let metodo = "";
    let url = "";

    const consoleLogOriginal = console.log;

    // Substitui o console.log temporariamente para capturar a mensagem emitida pelo middleware.
    console.log = (texto, reqMetodo, reqUrl) => {
      mensagem = texto;
      metodo = reqMetodo;
      url = reqUrl;
    };

    // Middleware de exemplo que regista o método e a rota do pedido.
    const mostrarPedido = (req, res, next) => {
      console.log("recebido", req.method, req.url);
      next();
    };

    app.use(mostrarPedido);

    app.get("/teste", (req, res) => {
      res.json({ ok: true });
    });

    await request(app).get("/teste").expect(200);

    expect(mensagem).toBe("recebido");
    expect(metodo).toBe("GET");
    expect(url).toBe("/teste");

    console.log = consoleLogOriginal;
  });
});
