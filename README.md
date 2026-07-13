# estagioback

Este projeto é uma API backend em Node.js com Express que consome dados de uma API externa de futebol e também integra Firebase Firestore para guardar favoritos de utilizadores.

## Objetivo geral

O backend serve como camada de comunicação entre o frontend e fontes de dados externas, oferecendo endpoints para:

- listar equipas;
- consultar detalhes de uma equipa;
- listar classificações de uma liga;
- listar jogos de uma liga;
- guardar ou remover equipas favoritas por utilizador;
- validar acesso administrativo com Auth0.

## Estrutura principal

- app.js: ponto de entrada da aplicação e definição de rotas principais.
- endpoints/: contém os handlers das rotas organizados por domínio.
- DB/equipas.js: base de dados local em memória usada para dados simples de equipas.
- cache.js: cache em memória para reduzir pedidos repetidos à API externa.
- firebase.js: inicialização do Firebase Admin SDK e ligação ao Firestore.
- auth0.js: ficheiro preparado para centralizar a configuração de Auth0 no futuro.

## Fluxo de funcionamento

1. O servidor Express é iniciado em app.js.
2. Cada endpoint chama a função correspondente em endpoints/.
3. Quando a rota precisa de dados externos, o backend faz um pedido à football-data.org.
4. As respostas podem ser guardadas em cache para diminuir chamadas repetidas.
5. Os favoritos são guardados em Firestore, com um identificador do utilizador e o id da equipa na API externa.

## Dependências principais

- express: criação da API.
- axios: pedidos HTTP para APIs externas.
- lru-cache: cache em memória.
- firebase-admin: integração com Firestore.
- express-oauth2-jwt-bearer: validação de tokens Auth0.
- vitest e supertest: testes de integração.

## Como correr localmente

1. Instalar dependências com npm install.
2. Criar um ficheiro .env com as variáveis necessárias para Auth0 e a API externa.
3. Executar o servidor com npm run dev.
4. Para validar o funcionamento, correr npm test.

## Pontos importantes para recordar

- O projeto usa uma base de dados local simples para as equipas, por isso os dados não são persistentes entre reinicializações.
- O cache é temporário e útil para reduzir latência e chamadas externas.
- Os favoritos são persistidos em Firestore e dependem da configuração correta do Firebase.
- As rotas de admin exigem um token válido com o scope admin:access.
