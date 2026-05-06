const express = require('express')
const app = express()
const port = 3000

//endpoints
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.send('Hello World!')
})

app.post('/test', (req, res) => {
    res.send('Hello Wordl')
})

app.post('/jogador', (req, res) => {
    res.json({ status: "created" });

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


