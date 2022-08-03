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
        const cart = await cartFile.save(initialCart);
        res.json({ id: cart.id });
    } catch (error) {
        res.json(error);
    }
})

cartRouter.delete('/:id', async (req, res) => {
    try {
        let cartID = parseInt(req.params.id)
        if (!isNaN(cartID)) {
            const cart = await cartFile.deleteById(cartID)
            if (cart.error) {
                res.json({ error: ERRORS.MESSAGES.NO_CART })
            } else {
                res.json({ success: 'carrito eliminado correctamente' })
            }
        } else {
            res.json({ error: ERRORS.MESSAGES.NOT_A_NUMBER })   
        }  
    } catch (error) {
        res.json(error)
    }
})

cartRouter.get('/:id/productos', async (req, res) => {
    try {
        const cartID = parseInt(req.params.id)
        if (!isNaN(cartID)) {
            const cart = await cartFile.getById(cartID)
            if (!cart) {
                res.json({ error: ERRORS.MESSAGES.NO_CART })
            } else {
                res.json(cart)
            }
        } else {
            res.json({ error: ERRORS.MESSAGES.NOT_A_NUMBER })   
        }
    } catch (error) {
        res.json(error)
    }
})

cartRouter.post('/:id/productos', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const productID = parseInt(req.body.id_prod)
        if (!isNaN(id)) {
            const cart = await cartFile.getById(id)
            if (!cart) {
                res.json({ error: ERRORS.MESSAGES.NO_CART })
            } else {
                const product = await productFile.getById(productID)
                if (!product) {
                    res.json({ error: ERRORS.MESSAGES.NO_PRODUCT })
                } else {
                    cart.productos.push(product)
                    const updatedCart = await cartFile.update(id, cart)
                    res.json(updatedCart)
                }
            }
        } else {
            res.json({ error: ERRORS.MESSAGES.NOT_A_NUMBER })
        }
    } catch (error) {
        res.json(error)
    }
})

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    try {
        let cartID = parseInt(req.params.id)
        let productID = parseInt(req.params.id_prod)
        if (!isNaN(cartID) && !isNaN(productID)) {
            const cart = await cartFile.getById(cartID)
            if (!cart) {
                res.json({ error: ERRORS.MESSAGES.NO_CART })
            } else {
                const exist = cart.productos.find(product => product.id === productID)
                if (!exist) {
                    res.json({ error: ERRORS.MESSAGES.NO_PRODUCT })
                } else {
                    const newArray = cart.productos.filter(product => product.id != productID)
                    const cartUpdated = await cartFile.update(cartID, { productos: newArray })
                    if (cartUpdated.error) {
                        res.json({ error: ERRORS.MESSAGES.NO_CART })
                    } else {
                        res.json({ success: 'producto eliminado correctamente' })
                    }
                }
            }
        } else {
            res.json({ error: ERRORS.MESSAGES.NOT_A_NUMBER })   
        }  
    } catch (error) {
        res.json(error)
    }
})

export { cartRouter }