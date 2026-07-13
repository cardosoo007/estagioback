// Ponto de entrada da API.
// Este ficheiro junta todos os módulos principais, define as rotas e inicializa o servidor Express.
import "./firebase.js";
import { getjogos } from "./endpoints/jogos.js";
import express from "express";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import { getequipas, equipabyid, postequipa } from "./endpoints/equipas.js";
import { getclassificacoes } from "./endpoints/classificacoes.js";
import { getfavoritos, postfavorito } from "./endpoints/favoritos.js";

// Cria a instância principal do servidor Express.
// Todas as rotas do projeto são registadas sobre esta aplicação e é aqui que o backend "vive" durante a execução.
const app = express();
const port = 3000;

// Middleware para processar payloads recebidos em JSON e em formulários.
// Este passo é essencial porque permite ao frontend enviar dados estruturados sem precisar de fazer tratamento manual no servidor.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do middleware de autenticação do Auth0.
// O token JWT é validado com base no audience e no issuer definidos no ficheiro .env, garantindo que apenas pedidos legítimos chegam às rotas protegidas.
const verificarToken = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

// Middleware para garantir que apenas utilizadores com o scope admin:access podem aceder a certas rotas.
const verificarAdmin = requiredScopes("admin:access");

// ===== ENDPOINTS GET =====
// Estas rotas servem para consultar dados públicos ou para devolver informação específica relacionada com o utilizador autenticado.
// São normalmente usadas para leitura, sem criar ou modificar dados no servidor.
app.get("/jogos", getjogos);
app.get("/classificacoes", getclassificacoes);
app.get("/equipas", getequipas);
app.get("/equipas/:idequipa", equipabyid);
app.get("/favoritos", verificarToken, getfavoritos);

// Rota de teste administrativa para validar se o utilizador tem permissões de admin.
app.get("/admin/verificar", verificarToken, verificarAdmin, (req, res) => {
  res.json({ isAdmin: true });
});

// ===== ENDPOINTS POST =====
// Estas rotas alteram ou criam dados, por isso exigem autenticação e, em alguns casos, permissões de admin.
// São as rotas usadas quando o frontend quer guardar informação nova ou trocar o estado de um recurso.
app.post("/equipas", verificarToken, verificarAdmin, postequipa);
app.post("/favoritos", verificarToken, postfavorito);

// Inicia o servidor na porta definida.
// Quando o processo arrancar, este console confirma que a API está disponível.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
