// Importar bibliotecas
import express from "express";
import { v4 as uuidv4 } from "uuid"; // Para gerar IDs únicos
import axios from "axios";
import { getmarcadores } from "./endpoints/marcadores.js";
import {
  getjogadores,
  jogadorbyid,
  postjogador,
} from "./endpoints/jogadores.js";
import {
  getequipas,
  equipabyid,
  jogadorporequipa,
  postequipa,
} from "./endpoints/equipas.js";
import { getclassificacoes } from "./endpoints/classificacoes.js";

// Criar aplicação Express
const app = express();
const port = 3000;

// Middleware para processar dados JSON e formulários
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// ===== ENDPOINTS GET =====

// Endpoint para devolver as classificações
app.get("/classificacoes", getclassificacoes);

// Devolve todas as equipas
app.get("/equipas", getequipas);

// Devolve a lista de marcadores
app.get("/marcadores", getmarcadores);
// Devolve todos os jogadores
app.get("/jogadores", getjogadores);

// Devolve um jogador específico pelo ID
app.get("/jogadores/:idjogador", jogadorbyid);

// Devolve uma equipa específica pelo ID
app.get("/equipas/:idequipa", equipabyid);

// Devolve os jogadores de uma equipa específica
app.get("/equipas/:idequipa/jogadores", jogadorporequipa);

// ===== ENDPOINTS POST =====

// Adiciona uma nova equipa
app.post("/equipas", postequipa);

// Adiciona um novo jogador
app.post("/jogadores", postjogador);

// Inicia o servidor na porta 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
