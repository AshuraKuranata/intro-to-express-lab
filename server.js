const express = require('express')
const app = express();

// 1. Be Polite to the User
app.get('/greetings/:userName', (req, res) => {
    res.send(`<h1>Welcome, ${req.params.userName}</h1>`)
})

// 2. Rolling the Dice

app.get('/roll/:diceValue', (req, res) => {
    function numCheck(value) {
        return !isNaN(value) && value !== "";
    }
    function diceRoll(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    let numInput = req.params.diceValue
    if (numCheck(numInput) === true) {
        res.send(`<h1>You rolled a ${diceRoll(1, numInput)}</h1>.`)
    } else {
        res.send(`<h1>Invalid input, please enter a number value.`)
    }
})

// 3. I Want THAT One!

app.get('/collectibles/:collectName', (req, res) => {
    const collectibles = [
        {name: 'pogs', price: 1.25},
        {name: 'paper', price: 30},
        {name: 'pencils', price: 5},
    ]
    const item = req.params.collectName

    // WORKING CODE, but clunky
//     if (item === collectibles[0].name) {
//         res.send(`You want ${collectibles[0].name}? It's yours for ${collectibles[0].price}!`)
//         }
//     else if (item === collectibles[1].name) {
//         res.send(`You want ${collectibles[1].name}? It's yours for ${collectibles[1].price}!`)
//         }
//     else if (item === collectibles[2].name) {
//         res.send(`You want ${collectibles[2].name}? It's yours for ${collectibles[2].price}!`)
//         }
//     else {
//         res.send(`This is not in stock, check back next Tuesday for updated inventory.`)
//     }
// })
    for (i = 0; i < collectibles.length; i++) {
        if (item == i) {
            res.send(`You want ${collectibles[i].name}? It's yours for ${collectibles[i].price}!`)
        }
        res.send(`This is not in stock, check back next Tuesday for updated inventory.`)
        }
})

//  BAD CODE: WHY ISN'T THE LOOP WORKING?
// Apparently, if you add the 'res.send' into the "if" statement it messes up the loop.  Make it go outside of the if statement and then it works.
//     for (i = 0; i < collectibles.length; i++) {
//         if (item == i) {
//             res.send(`You want ${collectibles[i].name}? It's yours for ${collectibles[i].price}!`)
//         }
//         else {
//             res.send(`This is not in stock, check back next Tuesday for updated inventory.`)
//         }
//     }
// })

// 4. Filter Shoes by Query Parameter

app.get('/shoes', (req, res) =>{
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];
    let shoePrice = req.query.price;
    let shoeNames = req.query.name;
    let shoeType = req.query.type;

    // min-price filter & max-price filter & type of sneaker & all shoes
    let minList = ""
    let maxList = ""
    let typeList = ""
    let fullList = ""
    for (i = 0; i < shoes.length; i++) {
        if (shoePrice < shoes[i].price) {
            minList = minList + " " + shoes[i].name
        }
        if (shoePrice > shoes[i].price) {
            maxList = maxList + " " + shoes[i].name
        }
        if (shoeType == shoes[i].type) {
            typeList = typeList + " " + shoes[i].name
        }
        if (shoes[i].name) {
            fullList = fullList + " " + shoes[i].name
        }
    }
    res.send(`List of shoes over $${shoePrice} value: ${minList}.<br> List of shoes under $${shoePrice} value: ${maxList}.<br> List of '${shoeType}' type shoes: ${typeList}.<br> List of all shoes: ${fullList}.`)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})