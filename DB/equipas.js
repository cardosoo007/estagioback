import { v4 as uuidv4 } from "uuid"; // Para gerar IDs únicos

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
