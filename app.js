const {buildDB} = require('./db/populateDataBase')

const express = require('express')
const { Cheese } = require('./models')
const app = express()

buildDB()

app.get('/', async (req, res) => {
    res.send("hello")
})

app.get('/feta', async (req, res) => {
    const fetaCheese = await Cheese.findOne({where: {title: "Feta"}})
    res.send(req.query)

    // render as html?
})

app.get('/Camembert', async (req, res) => {
    const camembertCheese = await Cheese.findOne({where: {title: "Camembert"}})
    res.send(camembertCheese)
})

app.get('/Roquefort', async (req, res) => {
    const roquefortCheese = await Cheese.findOne({where: {title: "Roquefort"}})
    res.send(roquefortCheese)
})



const port = 3000
app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
})
