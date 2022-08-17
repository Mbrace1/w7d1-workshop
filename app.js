const {buildDB} = require('./db/populateDataBase')
const { db} = require('./db/')
const express = require('express')
const { Cheese, User } = require('./models')
const app = express()

buildDB()

app.get('/', async (req, res) => {
    res.send("hello")
})

app.get('/cheeses/:cheese', async (req, res) => {
    const cheeseToString = req.params.cheese.toString()
    const cheeseCapital = cheeseToString.charAt(0).toUpperCase() + cheeseToString.slice(1);

    const fetaCheese = await Cheese.findOne({where: {title: cheeseCapital}})

    if (fetaCheese) {
        res.send(fetaCheese)
    } else {
        res.send("resource not found")
    }
})

app.get('/starts-with/:letter', async (req, res) => {
    const allCheeses = await Cheese.findAll()
    const letter = req.params.letter.toString().toUpperCase()
    console.log(letter)
    let startsWithLetter = allCheeses.filter(cheese => {
        if(cheese.title[0] === letter) {
            return true
        }
    })

    res.send(startsWithLetter)
})


app.get('/two-cheeses/', async (req, res) => {
    const cheese1 = req.query.cheese1
    const cheese2 = req.query.cheese2
    const cheeseCapital1 = cheese1.charAt(0).toUpperCase() + cheese1.slice(1);
    const cheeseCapital2 = cheese2.charAt(0).toUpperCase() + cheese2.slice(1);

    const foundCheese1 = await Cheese.findOne({where: {title: cheeseCapital1}})
    const foundCheese2 = await Cheese.findOne({where: {title: cheeseCapital2}})
    if (foundCheese1 && foundCheese2) {
        const bothCheeses = {
            cheese1: foundCheese1,
            cheese2: foundCheese2,
        }
        res.send(bothCheeses)
    } else {
        res.send("resource not found")
    }
})


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post("/cheeses/", async (req,res) => {
    await Cheese.create(req.body)
    const allCheeses = await Cheese.findAll()
    res.send(allCheeses)
})

app.put("/cheeses/:id", async (req,res) => {
    const cheeseId = req.params.id
    const updatedCheeses = await Cheese.update(
        req.body,
        {where: {"id": cheeseId}}
    )

    const allCheeses = await Cheese.findAll()
    res.send(allCheeses)
})

app.delete("/cheeses/:id", async (req,res) => {
    const cheeseId = req.params.id
    const deletedCheeses = await Cheese.destroy(
        {where: {"id": cheeseId}}
    )

    const allCheeses = await Cheese.findAll()
    res.send(allCheeses)
})

const port = 3000
app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
})
