import equipasDB from "../DB/equipas.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import cache from "../cache.js";

// Lista as equipas existentes com paginação simples.
// O frontend pode pedir uma página específica através de query params como ?pagina=0&items=5.
export const getequipas = (req, res) => {
  // A query string pagina indica qual parte da lista o cliente quer ver, enquanto items define o tamanho dessa parte.
  // Este mecanismo permite ao frontend pedir dados em blocos em vez de receber a lista completa de uma vez.
  const pagina = req.query.pagina;
  const items = req.query.items;

  // Calcula o intervalo de dados a devolver para a página pedida.
  // O ponto inicial e o ponto final definem exatamente qual parte da lista é enviada ao cliente.
  const start = pagina * items;
  const end = start + items;

  // Slice permite devolver só uma parte da lista, mantendo a lógica simples e eficiente para uma API inicial.
  const resultado = equipasDB.slice(start, end);

  // Estrutura de resposta pensada para o frontend: lista da página, total global e comprimento da página.
  // Esta forma facilita a construção de interfaces com paginação e contagem total de elementos.
  const devolver = {
    items: resultado,
    total: equipasDB.length,
    length: resultado.length,
  };

  res.json(devolver);
};

// Devolve os detalhes de uma equipa através do ID externo da API de futebol.
// O ID usado nesta rota não é o id interno do projeto, mas o id fornecido pela football-data.org.
export const equipabyid = async (req, res) => {
  // A chave criada com o id da equipa serve para identificar de forma única cada entrada guardada em cache.
  // Isto evita que dados de uma equipa sejam confundidos com os dados de outra.
  const key = `equipa-${req.params.idequipa}`;
  const dadosEmCache = cache.get(key);

  if (dadosEmCache) {
    return res.json(dadosEmCache);
  }

  // Requisição à API externa para buscar o detalhe completo da equipa.
  // O token é guardado no backend para não ser exposto no browser.
  const response = await axios.get(
    `https://api.football-data.org/v4/teams/${req.params.idequipa}`,
    {
      headers: {
        "X-Auth-Token": process.env.API_KEY,
      },
    },
  );

  // Guarda a resposta em cache para pedidos repetidos e para reduzir chamadas à API.
  cache.set(key, response.data);

  res.json(response.data);
};

// Cria uma nova equipa na base de dados local do projeto.
// A validação simples protege contra duplicações por nome.
export const postequipa = (request, response) => {
  // A função some verifica se já existe alguma equipa com o mesmo nome na base de dados local.
  // Esta verificação evita duplicações simples e mantém a lista mais organizada.
  const jaExiste = equipasDB.some((equipa) => {
    return (
      equipa.equipa.toLowerCase() ===
      request.body.novaEquipa.nomeEquipa.toLowerCase()
    );
  });

  if (jaExiste) {
    return response.status(400).json({ error: "Equipa já existe" });
  }

  // Adiciona a nova equipa ao array em memória.
  // O id é gerado automaticamente para não depender da ordem dos elementos.
  equipasDB.push({
    id: uuidv4(),
    equipa: request.body.novaEquipa.nomeEquipa,
    treinador: {
      nome: request.body.novaEquipa.nomeTreinador,
      idade: request.body.novaEquipa.idadeTreinador,
    },
    pontos: request.body.novaEquipa.pontos,
  });

  response.json({});
};
