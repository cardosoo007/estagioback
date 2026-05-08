const express = require('express')
const app = express()
const port = 3000

//endpoints 

app.get('/classificacoes', (req, res) => {

    const classificacoes = [
        { equipa: "Benfica", pontos: 30 },
        { equipa: "Porto", pontos: 32 },
        { equipa: "Sporting", pontos: 27 }
    ];
    res.json(classificacoes);
})
app.get('/equipas', (req, res) => {

    const equipas = [
        {
            equipa: "Benfica",
            treinador: { nome: "Jose Mourinho", idade: 57 },
            jogadores: [
                { id: 1, nome: "Pavlidis", idade: 36, posicao: "Extremo" },
                { id: 2, nome: "Rafa", idade: 31, posicao: "Avançado" }],
        },

        {
            equipa: "Porto",
            treinador: { nome: "Farioli", idade: 40 },
            jogadores: [
                { id: 3, nome: "Pepe", idade: 41, posicao: "Defesa" },
                { id: 4, nome: "Kiwior", idade: 24, posicao: "Defesa" },
                { id: 5, nome: "Zaidu", idade: 27, posicao: "Defesa" }]
        },
        {
            equipa: "Sporting",
            treinador: { nome: "Rúben Amorim", idade: 39 },
            jogadores: [
                { id: 6, nome: "Suarez", idade: 27, posicao: "Avançado" },
                { id: 7, nome: "Pedro Gonçalves", idade: 26, posicao: "Médio" },
                { id: 8, nome: "Inácio", idade: 22, posicao: "Defesa" }]
        }

    ];

    res.json(equipas);
})

app.get('/marcadores', (req, res) => {

    const marcadores = [
        { id: 5, jogador: "Zaidu", equipa: "Porto", golos: 18 },
        { id: 6, jogador: "Suarez", equipa: "Sporting", golos: 15 },
        { id: 2, jogador: "Rafa", equipa: "Benfica", golos: 12 },
        { id: 4, jogador: "Kiwior", equipa: "Porto", golos: 10 },
    ];

    res.json(marcadores);
});

app.get('/jogadores/:idjogador', (req, res) => {


    const marcadores = [
        { id: 5, nome: "Zaidu", idade: 27, posicao: "Avançado", equipa: "Porto", golos: 18 },
        { id: 6, nome: "Suarez", idade: 27, posicao: "Avançado", equipa: "Sporting", golos: 15 },
        { id: 2, nome: "Rafa", idade: 31, posicao: "Avançado", equipa: "Benfica", golos: 12 },
        { id: 4, nome: "Kiwior", idade: 24, posicao: "Defesa", equipa: "Porto", golos: 10 },
    ];

    const jogador = marcadores.find(marcador => marcador.id == (req.params.idjogador));
    console.log(jogador);
    res.json(jogador);
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


