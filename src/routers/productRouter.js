import { Router } from 'express';
import ProductFile from '../daos/products/productFile.js'
import ProductSqldb from '../daos/products/productSqldb.js'
import ProductMongodb from '../daos/products/productMongodb.js'
import { ERRORS } from '../utils/index.js'
import { Admin } from "../middlewares/index.js"

const productRouter = Router()
const productFile = new ProductFile()
const productSql = new ProductSqldb()
const productMongodb = new ProductMongodb()


productRouter.get('/', async (req, res) => {
    try {
        //const products = await productApi.getAll();
        //const products = await productSql.getAll()
        const products = await productMongodb.getAll()
        res.json(products);
    } catch (error) {
        res.json(error);
    }
})

productRouter.get('/:id', async (req, res) => {
    try {
        const productID = req.params.id
        //const productID = parseInt(req.params.id)
        //if (!isNaN(productID)) {
            //const product = await productApi.getById(productID)
            //const product = await productSql.getById(productID)
        const product = await productMongodb.getById(productID)
        if (!product) {
            res.json({ error: ERRORS.MESSAGES.NO_PRODUCT })
        } else {
            res.json(product)
        }
        //} else {
        //    res.json({ error: ERRORS.MESSAGES.NOT_A_NUMBER })   
        //}
    } catch (error) {
        res.json(error)
    }
})

productRouter.post('/', Admin, async (req, res) => {
    try {
        const { nombre, descripcion, codigo, precio, foto, stock } = req.body
        const product = { nombre, descripcion, codigo, foto}
        product.precio = parseInt(precio)
        product.stock = parseInt(stock)
        if (!isNaN(product.precio) && !isNaN(product.stock)) {
            if (nombre.trim() == '' || descripcion.trim() == '' || codigo.trim() == '' || precio.trim() == '' || foto.trim() == '' || stock.trim() == '') {
                res.json({ error: 'ningun campo puede estar vacio' })
            }
            else {
                //await productApi.save(product)
                //await productSql.save(product)
                await productMongodb.save(product)
                res.redirect('/addProduct')
            }
        } else {
            res.json({ error: 'precio y stock deben ser numericos' })
        }
    } catch (error) {
        res.json(error)
    }
})

productRouter.put('/:id', Admin, async (req, res) => {
    try {
        const { nombre, descripcion, codigo, precio, foto, stock } = req.body
        const productUpdate = { nombre, descripcion, codigo, foto }
        //const productID = parseInt(req.params.id)
        const productID = req.params.id
        productUpdate.precio = parseInt(precio)
        productUpdate.stock = parseInt(stock)
        //if (!isNaN(productID)) {
        if (!isNaN(productUpdate.precio) && !isNaN(productUpdate.stock)) {
            //const product = await productApi.update(productID, productUpdate)
            //const product = await productSql.update(productID, productUpdate)
            const product = await productMongodb.update(productID, productUpdate)
            if (product.error) {
                res.json({ error: ERRORS.MESSAGES.NO_PRODUCT })
            } else {
                res.json(product)
            }
        } else {
            res.json({ error: 'precio y stock deben ser numericos' })   
        }
        //} else {
        //    res.json({ error: ERRORS.MESSAGES.NOT_A_NUMBER })   
        //}
    } catch (error) {
        res.json(error)
    }
})

productRouter.delete('/:id', Admin, async (req, res) => {
    try {
        //const productID = parseInt(req.params.id)
        const productID = req.params.id
        //if (!isNaN(productID)) {
            //const product = await productApi.deleteById(productID)
        //const product = await productSql.deleteById(productID)
        const product = await productMongodb.deleteById(productID)
        if (product.error) {
            res.json({ error: ERRORS.MESSAGES.NO_PRODUCT })
        } else {
            res.json({ success: 'producto eliminado correctamente' }) 
        }
        //} else {
        //    res.json({ error: ERRORS.MESSAGES.NOT_A_NUMBER })   
        //}  
    } catch (error) {
        res.json(error)
    }
})

export { productRouter }