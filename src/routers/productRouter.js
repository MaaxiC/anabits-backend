import { Router } from 'express';
import { ContainerMemoria } from '../api/containerMemoria.js'

const productRouter = Router()
const productApi = new ContainerMemoria()

productRouter.get('/', (req, res) => {
    const products = productApi.getAll()
    res.render('./ejs/table', {products})
})

productRouter.get('/:id', (req, res) => {
    const productID = parseInt(req.params.id)
    const products = productApi.getAll()
    if (!isNaN(productID)) {
        if (productID >= 1 && productID <= products.length) {
            const product = productApi.getById(productID)
            res.json(product)
        } else {
            res.json({error: 'producto no encontrado'})
        }       
    } else {
        res.json({error: 'id debe ser un numero'})   
    }
})

productRouter.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body
    const product = { title, price, thumbnail }
    if (!isNaN(product.price)) {
        if (title.trim() == '' || price.trim() == '' || thumbnail.trim() == '') {
            res.json({error: 'ningun campo puede estar vacio'})
        }
        else {
            productApi.save(product)
            res.redirect('/')
        }
    } else {
        res.json({error: 'precio debe ser un numero'})
    }
})

productRouter.put('/:id', (req, res) => {
    const { title, price, thumbnail } = req.body
    const productID = parseInt(req.params.id)
    if (!isNaN(productID)) {
        const product = productApi.updateById(productID, { title, price, thumbnail })
        if (product.error) res.json({ error: 'producto no encontrado'})
        res.json(product)
    } else {
        res.json({error: 'id debe ser un numero'})   
    }
})

productRouter.delete('/:id', (req, res) => {
    let productID = parseInt(req.params.id)
    if (!isNaN(productID)) {
            const product = productApi.deleteById(productID)
            if (product.error) res.json({ error: 'producto no encontrado'})
            res.json({ success: 'producto eliminado correctamente' })      
    } else {
        res.json({error: 'id debe ser un numero'})   
    }
})

export { productRouter }