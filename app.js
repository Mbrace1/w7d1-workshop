const {buildDB} = require('./db/populateDataBase')

const express = require('express')
const { Cheese } = require('./models')
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


const port = 3000
app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
})
