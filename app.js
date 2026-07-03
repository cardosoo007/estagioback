// Importar bibliotecas
import "./firebase.js";
import { getjogos } from "./endpoints/jogos.js";
import express from "express";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import { getequipas, equipabyid, postequipa } from "./endpoints/equipas.js";
import { getclassificacoes } from "./endpoints/classificacoes.js";
import { getfavoritos, postfavorito } from "./endpoints/favoritos.js";

// Criar aplicação Express
const app = express();
const port = 3000;

const mostrarPedido = (req, res, next) => {
  console.log("recebido", req.method, req.url);

  next();
};

// Middleware para mostrar os pedidos recebidos
app.use(mostrarPedido);
// Middleware para processar dados JSON e formulários
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const verificarToken = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

const verificarAdmin = requiredScopes("admin:access");
// ===== ENDPOINTS GET =====

app.get("/jogos", getjogos);
// Endpoint para devolver as classificações
app.get("/classificacoes", getclassificacoes); // Devolve todas as equipas

app.get("/equipas", getequipas);

// Devolve uma equipa específica pelo ID
app.get("/equipas/:idequipa", equipabyid);

app.get("/favoritos", verificarToken, getfavoritos);

app.get("/admin/verificar", verificarToken, verificarAdmin, (req, res) => {
  res.json({ isAdmin: true });
});

// ===== ENDPOINTS POST =====

// Adiciona uma nova equipa
app.post("/equipas", verificarToken, verificarAdmin, postequipa);

app.post("/favoritos", verificarToken, postfavorito);

// Inicia o servidor na porta 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
