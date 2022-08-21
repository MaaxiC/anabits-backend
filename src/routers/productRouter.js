import { Router } from 'express'
import { ProductDao } from "../daos/index.js"
import { ERRORS, JOI_VALIDATOR } from '../utils/index.js'
import { Admin } from "../middlewares/index.js"

const productRouter = Router()

const ProductApi = ProductDao

productRouter.get('/', async (req, res) => {
    try {
        const products = await ProductApi.getAll()
        res.send(products)
    } catch (error) {
        res.send(error)
    }
})

productRouter.get('/:id', async (req, res) => {
    try {
        const productID = req.params.id
        const product = await ProductApi.getById(productID)
        if (!product || product.kind) { return res.send({ error: ERRORS.MESSAGES.NO_PRODUCT }) } 
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

productRouter.post('/', Admin, async (req, res) => {
    try {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        const product = await JOI_VALIDATOR.product.validateAsync({
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock,
        })
        const productSaved = await ProductApi.save(product)
        res.send(productSaved)
    } catch (error) {
        res.send(error)
    }
})

productRouter.put('/:id', Admin, async (req, res) => {
    try {
        const productID = req.params.id
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        const product = await JOI_VALIDATOR.product.validateAsync({
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock,
        });
        const productSaved = await ProductApi.update(productID, product)
        if (!productSaved || productSaved.kind) { return res.send({ error: ERRORS.MESSAGES.NO_PRODUCT }) }
        res.send(productSaved)
    } catch (error) {
        res.send(error)
    }
})

productRouter.delete('/:id', Admin, async (req, res) => {
    try {
        const productID = req.params.id
        const response = await ProductApi.deleteById(productID)
        if (!response || response.kind) { return res.send({ error: ERRORS.MESSAGES.NO_PRODUCT }) }
        res.send({ success: 'producto eliminado correctamente' })
    } catch (error) {
        res.send(error)
    }
})

export { productRouter }