import express from 'express'
import Api from './api.js'

const app = express()
const routerProducts = express.Router()
const api = new Api('./products.txt')

app.use('/api', routerProducts)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
routerProducts.use(express.json())
routerProducts.use(express.urlencoded({ extended: true }))

routerProducts.get('/productos', async (req, res) => {
    const products = await api.getAll()
    res.json(products)
})

routerProducts.get('/productos/:id', async (req, res) => {
    const products = await api.getAll()
    let productID = parseInt(req.params.id)
    if (!isNaN(productID)) {
        if (productID >= 1 && productID <= products.length) {
            const product = await api.getById(productID)
            res.json(product)
        } else {
            res.json({error: 'producto no encontrado'})
        }       
    } else {
        res.json({error: 'id debe ser un numero'})   
    }
})

routerProducts.post('/productos', async (req, res) => {
    let product = req.body
    if (!isNaN(product.price)) {
        res.json(await api.save(product))
    } else {
        res.json({error: 'precio debe ser un numero'})
    }
})

routerProducts.put('/productos/:id', async (req, res) => {
    const products = await api.getAll()
    let productID = parseInt(req.params.id)
    if (!isNaN(productID)) {
        if (productID >= 1 && productID <= products.length) {
            const product = await api.update(productID, req.body)
            res.json(product)
        } else {
            res.json({error: 'producto no encontrado'})
        }       
    } else {
        res.json({error: 'id debe ser un numero'})   
    }
})

routerProducts.delete('/productos/:id', async (req, res) => {
    const products = await api.getAll()
    let productID = parseInt(req.params.id)
    if (!isNaN(productID)) {
        if (productID >= 1 && productID <= products.length) {
            const product = await api.deleteById(productID)
            res.json(product)
        } else {
            res.json({error: 'producto no encontrado'})
        }       
    } else {
        res.json({error: 'id debe ser un numero'})   
    }
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`listening on http://localhost:${server.address().port}`)
})
server.on('error', err => console.log(`Error on server ${err}`))