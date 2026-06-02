import equipasDB from "../DB/equipas.js";
import jogadoresDB from "../DB/jogadores.js";

export const getequipas = (req, res) => {
  const pagina = req.query.pagina;
  const items = req.query.items;

  const start = pagina * items;
  const end = start + items;

  const resultado = equipasDB.slice(start, end);

  const devolver = {
    items: resultado,
    total: equipasDB.length,
    length: resultado.length,
  };

  res.json(devolver);
};

// Devolve uma equipa específica pelo ID
export const equipabyid = (req, res) => {
  const equipa = equipasDB.find((equipa) => equipa.id == req.params.idequipa);
  console.log(equipa); // Debug
  res.json(equipa);
};

// Devolve os jogadores de uma equipa específica
export const jogadorporequipa = (req, res) => {
  // Procura a equipa pelo ID
  const equipa = equipasDB.find((equipa) => equipa.id == req.params.idequipa);

  // Procura os jogadores dessa equipa
  const jogadores = jogadoresDB.filter(
    (jogador) => jogador.equipa.toLowerCase() === equipa.equipa.toLowerCase(),
  );

  console.log(jogadores); // Debug

  // Devolve os jogadores encontrados
  res.json(jogadores);
};

// Adiciona uma nova equipa
export const postequipa = (request, response) => {
  const jaExiste = equipasDB.some((equipa) => {
    return (
      equipa.equipa.toLowerCase() ===
      request.body.novaEquipa.nomeEquipa.toLowerCase()
    );
  });
  console.log(request.body);
  if (jaExiste) {
    return response.status(400).json({ error: "Equipa já existe" });
  }

  console.log(request.body.novaEquipa.nomeEquipa); // Imprime os dados recebidos
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
