import { LRUCache } from "lru-cache";

// Cache em memória usado para reduzir pedidos repetidos a APIs externas.
// O objetivo é guardar respostas recentes por um período curto de tempo, evitando sobrecarregar a API e melhorando a velocidade das respostas.
// Neste projeto, o cache é usado principalmente nas rotas de futebol, classificações e jogos, onde os mesmos dados podem ser pedidos várias vezes seguidas.
const cache = new LRUCache({
  max: 200,
  ttl: 1000 * 60 * 15,
});

export default cache;
