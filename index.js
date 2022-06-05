const express = require('express')
const Container = require('./Container.js')

const app = express()
const productsContainer = new Container('./products.txt')

const port = 8080

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`))

app.get('/products', async (req, res) => {
    try {
        const products = await productsContainer.getAll()
        res.send(products)
    } catch (error) {
        res.send(error)
    }
})

app.get('/productRandom', async (req, res) => {
    const products = await productsContainer.getAll()

    const index = Math.floor(Math.random() * products.length)

    res.send(products[index])
})