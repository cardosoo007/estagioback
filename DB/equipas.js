import { v4 as uuidv4 } from "uuid";

// Base de dados local em memória usada para simular uma fonte de dados simples.
// Esta estrutura é útil para demonstrações, testes e desenvolvimento inicial antes de integrar uma base de dados persistente.
// Cada equipa contém um id gerado automaticamente, o nome, o treinador e os pontos atuais.
const equipasDB = [
  {
    id: uuidv4(),
    equipa: "Benfica",
    treinador: { nome: "Jose Mourinho", idade: 57 },
    pontos: 30,
  },
  {
    id: uuidv4(),
    equipa: "Porto",
    treinador: { nome: "Farioli", idade: 40 },
    pontos: 32,
  },
  {
    id: uuidv4(),
    equipa: "Sporting",
    treinador: { nome: "Rúben Amorim", idade: 39 },
    pontos: 27,
  },
  {
    id: uuidv4(),
    equipa: "Valonguese",
    treinador: { nome: "Joao Sousa", idade: 60 },
    pontos: 27,
  },
];

export default equipasDB;
