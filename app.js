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
                { nome: "Pavlidis", idade: 36, posicao: "Extremo" },
                { nome: "Rafa", idade: 31, posicao: "Avançado" }],
        },

        {
            equipa: "Porto",
            treinador: { nome: "Farioli", idade: 40 },
            jogadores: [
                { nome: "Pepe", idade: 41, posicao: "Defesa" },
                { nome: "Kiwior", idade: 24, posicao: "Defesa" },
                { nome: "Zaidu", idade: 27, posicao: "Defesa" }]
        },
        {
            equipa: "Sporting",
            treinador: { nome: "Rúben Amorim", idade: 39 },
            jogadores: [
                { nome: "Suarez", idade: 27, posicao: "Avançado" },
                { nome: "Pedro Gonçalves", idade: 26, posicao: "Médio" },
                { nome: "Inácio", idade: 22, posicao: "Defesa" }]
        }

    ];

    res.json(equipas);
})

app.get('/marcadores', (req, res) => {

    const marcadores = [
        { jogador: "Zaidu", equipa: "Porto", golos: 18 },
        { jogador: "Suarez", equipa: "Sporting", golos: 15 },
        { jogador: "Rafa", equipa: "Benfica", golos: 12 },
        { jogador: "Kiwior", equipa: "Porto", golos: 10 },
    ];

    res.json(marcadores);
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


