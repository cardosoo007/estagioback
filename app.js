// Importar bibliotecas
import "./firebase.js";

import express from "express";
import { getequipas, equipabyid, postequipa } from "./endpoints/equipas.js";
import { getclassificacoes } from "./endpoints/classificacoes.js";
import { getfavoritos, postfavorito } from "./endpoints/favoritos.js";

// Criar aplicação Express
const app = express();
const port = 3000;

// Middleware para processar dados JSON e formulários
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function verificarToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Token em falta" });
  }

  next();
}
// ===== ENDPOINTS GET =====

// Endpoint para devolver as classificações
app.get("/classificacoes", getclassificacoes);

// Devolve todas as equipas
app.get("/equipas", getequipas);

// Devolve uma equipa específica pelo ID
app.get("/equipas/:idequipa", equipabyid);

app.get("/favoritos", verificarToken, getfavoritos);

// ===== ENDPOINTS POST =====

// Adiciona uma nova equipa
app.post("/equipas", postequipa);

app.post("/favoritos", verificarToken, postfavorito);

// Inicia o servidor na porta 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
