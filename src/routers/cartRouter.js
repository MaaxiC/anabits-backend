import { Router } from 'express';
import { ProductDao, CartDao } from "../daos/index.js"
import { ERRORS } from '../utils/index.js'

const cartRouter = Router()

const CartApi = CartDao
const ProductApi = ProductDao

const initialCart = { productos: [], }

cartRouter.post("/", async (req, res) => {
    try {
        const { nombre } = req.body
        const cart = await CartApi.save({
            ...initialCart,
            nombre: nombre ?? "carritoPrueba",
        });
        const cartId = cart.id
        res.send({ id: cartId })
    } catch (error) {
        res.send(error)
    }
})

cartRouter.delete('/:id', async (req, res) => {
    try {
        const cartID = req.params.id
        const cart = await CartApi.deleteById(cartID)
        if (cart.error || cart.kind) { return res.send({ error: ERRORS.MESSAGES.NO_CART }) }
        res.send({ success: 'carrito eliminado correctamente' })
    } catch (error) {
        res.send(error)
    }
})

cartRouter.get('/:id/productos', async (req, res) => {
    try {
        const cartID = req.params.id
        const cart = await CartApi.getById(cartID)
        if (!cart || cart.kind) { return res.send({ error: ERRORS.MESSAGES.NO_CART }) }
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

cartRouter.post('/:id/productos', async (req, res) => {
    try {
        const id = req.params.id
        const productID = req.body.productId
        const cart = await CartApi.getById(id)
        if (!cart || cart.kind) { return res.send({ error: ERRORS.MESSAGES.NO_CART }) }
        const product = await ProductApi.getById(productID)
        if (!product || product.kind) { return res.send({ error: ERRORS.MESSAGES.NO_PRODUCT }) }
        cart.productos.push(product)
        const updatedCart = await CartApi.update(id, cart)
        res.send(updatedCart)
    } catch (error) {
        res.send(error)
    }
})

cartRouter.put("/:id/productos", async (req, res) => {
    try {
        const id = req.params.id
        const productID = req.body.productId
        const cart = await CartApi.getById(id)
        const product = await ProductApi.getById(productID)
        if (!cart || cart.kind) { return res.send({ error: ERRORS.MESSAGES.NO_CART }) }
        if (!product || product.kind) { return res.send({ error: ERRORS.MESSAGES.NO_PRODUCT }) }
        cart.productos = cart.productos.filter((product) => product.id != productID)
        const updatedCart = await CartApi.update(id, cart)
        res.send(updatedCart)
    } catch (error) {
        res.send(error)
    }
})

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    try {
        const cartID = req.params.id
        const productID = req.params.id_prod
        const cart = await CartApi.getById(cartID)
        if (!cart || cart.kind) { return res.send({ error: ERRORS.MESSAGES.NO_CART }) }
        const newCart = cart.productos
        const exist = newCart.find(product => product.id == productID)
        if (!exist) { return res.send({ error: ERRORS.MESSAGES.NO_PRODUCT }) } 
        const newArray = newCart.filter(product => product.id != productID)
        cart.productos = newArray
        const cartUpdated = await CartApi.update(cartID, cart)
        console.log(cartUpdated)
        if (!cartUpdated || cartUpdated.kind) { return res.send({ error: 'error al borrar el producto' }) } 
        res.send({ success: 'producto eliminado correctamente' })
    } catch (error) {
        res.send(error)
    }
})

export { cartRouter }