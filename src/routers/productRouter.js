import { Router } from 'express';
import { ProductDao } from "../daos/index.js";
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
        if (!product || product.kind) {
            res.send({ error: ERRORS.MESSAGES.NO_PRODUCT })
        } else {
            res.send(product)
        }
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
        // const product = { nombre, descripcion, codigo, foto}
        // product.precio = parseInt(precio)
        // product.stock = parseInt(stock)
        // if (!isNaN(product.precio) && !isNaN(product.stock)) {
        //     if (nombre.trim() == '' || descripcion.trim() == '' || codigo.trim() == '' || precio.trim() == '' || foto.trim() == '' || stock.trim() == '') {
        //         res.json({ error: 'ningun campo puede estar vacio' })
        //     }
        //     else {
        //         //await productApi.save(product)
        //         //await productSql.save(product)
        //         await productMongodb.save(product)
        //         res.redirect('/addProduct')
        //     }
        // } else {
        //     res.json({ error: 'precio y stock deben ser numericos' })
        // }
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
        if (!productSaved || productSaved.kind) {
            res.send({ error: ERRORS.MESSAGES.NO_PRODUCT })
        } else {
            res.send(productSaved)
        }
        //const productUpdate = { nombre, descripcion, codigo, foto }
        //productUpdate.precio = parseInt(precio)
        //productUpdate.stock = parseInt(stock)
        //if (!isNaN(productID)) {
        // if (!isNaN(productUpdate.precio) && !isNaN(productUpdate.stock)) {
            //const product = await productApi.update(productID, productUpdate)
            //const product = await productSql.update(productID, productUpdate)
        //     const product = await productMongodb.update(productID, productUpdate)
        //     if (product.error) {
        //         res.json({ error: ERRORS.MESSAGES.NO_PRODUCT })
        //     } else {
        //         res.json(product)
        //     }
        // } else {
        //     res.json({ error: 'precio y stock deben ser numericos' })   
        // }
        //} else {
        //    res.json({ error: ERRORS.MESSAGES.NOT_A_NUMBER })   
        //}
    } catch (error) {
        res.send(error)
    }
})

productRouter.delete('/:id', Admin, async (req, res) => {
    try {
        const productID = req.params.id
        const response = await ProductApi.deleteById(productID)
        if (!response || response.kind) {
            res.send({ error: ERRORS.MESSAGES.NO_PRODUCT })
        } else {
            res.send({ success: 'producto eliminado correctamente' })
        }
        //if (!isNaN(productID)) {
            //const product = await productApi.deleteById(productID)
        //const product = await productSql.deleteById(productID)
        // const product = await productMongodb.deleteById(productID)
        // if (product.error) {
        //     res.json({ error: ERRORS.MESSAGES.NO_PRODUCT })
        // } else {
        //     res.json({ success: 'producto eliminado correctamente' }) 
        // }
        //} else {
        //    res.json({ error: ERRORS.MESSAGES.NOT_A_NUMBER })   
        //}  
    } catch (error) {
        res.send(error)
    }
})

export { productRouter }