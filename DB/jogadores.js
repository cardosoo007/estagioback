import { v4 as uuidv4 } from "uuid"; // Para gerar IDs únicos

const jogadoresDB = [
  {
    id: uuidv4(),
    nome: "Zaidu",
    idade: 27,
    posicao: "Avançado",
    equipa: "Porto",
    golos: 18,
  },
  {
    id: uuidv4(),
    nome: "Suarez",
    idade: 27,
    posicao: "Avançado",
    equipa: "Sporting",
    golos: 15,
  },
  {
    id: uuidv4(),
    nome: "Rafa",
    idade: 31,
    posicao: "Avançado",
    equipa: "Benfica",
    golos: 12,
  },
  {
    id: uuidv4(),
    nome: "Kiwior",
    idade: 24,
    posicao: "Defesa",
    equipa: "Porto",
    golos: 0,
  },
  {
    id: uuidv4(),
    nome: "Otávio",
    idade: 29,
    posicao: "Médio",
    equipa: "Porto",
    golos: 5,
  },
  {
    id: uuidv4(),
    nome: "Doumbia",
    idade: 26,
    posicao: "Avançado",
    equipa: "Sporting",
    golos: 9,
  },
  {
    id: uuidv4(),
    nome: "Paulista",
    idade: 30,
    posicao: "Defesa",
    equipa: "Sporting",
    golos: 1,
  },
  {
    id: uuidv4(),
    nome: "Otamendi",
    idade: 34,
    posicao: "Defesa",
    equipa: "Benfica",
    golos: 2,
  },
  {
    id: uuidv4(),
    nome: "Grimaldo",
    idade: 28,
    posicao: "Lateral",
    equipa: "Benfica",
    golos: 7,
  },
];

export default jogadoresDB;
