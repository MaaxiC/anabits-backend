import { Router } from 'express';
import CartFile from '../daos/carts/cartFile.js'
import CartSqldb from '../daos/carts/cartSqldb.js'
import CartMongodb from '../daos/carts/cartMongodb.js'
import ProductFile from '../daos/products/productFile.js'
import ProductSqldb from '../daos/products/productSqldb.js'
import ProductMongodb from '../daos/products/productMongodb.js'
import { ERRORS } from '../utils/index.js'

const cartRouter = Router()
const cartFile = new CartFile()
const cartSqldb = new CartSqldb()
const cartMongodb = new CartMongodb()
const productFile = new ProductFile()
const productSql = new ProductSqldb()
const productMongodb = new ProductMongodb()

const initialCart = { productos: [] }

cartRouter.post("/", async (req, res) => {
    try {
        //const cart = await cartFile.save(initialCart)
        const cart = await cartMongodb.save(initialCart)
        res.json({ id: cart._id })
    } catch (error) {
        res.json(error)
    }
})

cartRouter.delete('/:id', async (req, res) => {
    try {
        let cartID = req.params.id
        //const cart = await cartFile.deleteById(cartID)
        const cart = await cartMongodb.deleteById(cartID)
        if (cart.error) {
            res.json({ error: ERRORS.MESSAGES.NO_CART })
        } else {
            res.json({ success: 'carrito eliminado correctamente' })
        }
    } catch (error) {
        res.json(error)
    }
})

cartRouter.get('/:id/productos', async (req, res) => {
    try {
        const cartID = req.params.id
        //const cart = await cartFile.getById(cartID)
        const cart = await cartMongodb.getById(cartID)
        if (!cart) {
            res.json({ error: ERRORS.MESSAGES.NO_CART })
        } else {
            res.json(cart)
        }
    } catch (error) {
        res.json(error)
    }
})

cartRouter.post('/:id/productos', async (req, res) => {
    try {
        const id = req.params.id
        const productID = req.body._id
        const cart = await cartMongodb.getById(id)
        if (!cart) {
            res.json({ error: ERRORS.MESSAGES.NO_CART })
        } else {
            const product = await productMongodb.getById(productID)
            if (!product) {
                res.json({ error: ERRORS.MESSAGES.NO_PRODUCT })
            } else {
                const newProduct = product[0]
                const {_id, nombre, descripcion, codigo, foto, precio} = newProduct
                const newCart = cart[0]
                newCart.productos.push({_id, nombre, descripcion, codigo, foto, precio})
                const updatedCart = await cartMongodb.update(id, newCart)
                res.json(updatedCart)
            }
        }
    } catch (error) {
        res.json(error)
    }
})

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    try {
        const cartID = req.params.id
        const productID = req.params.id_prod
        const cart = await cartMongodb.getById(cartID)
        if (!cart) {
            res.json({ error: ERRORS.MESSAGES.NO_CART })
        } else {
            const newCart = cart[0]
            const exist = newCart.productos.find(product => product._id == productID)
            if (!exist) {
                res.json({ error: ERRORS.MESSAGES.NO_PRODUCT })
            } else {
                const newArray = newCart.productos.filter(product => product._id != productID)
                const cartUpdated = await cartMongodb.update(cartID, { productos: newArray })
                if (cartUpdated.error) {
                    res.json({ error: ERRORS.MESSAGES.NO_CART })
                } else {
                    res.json({ success: 'producto eliminado correctamente' })
                }
            }
        }
    } catch (error) {
        res.json(error)
    }
})

export { cartRouter }