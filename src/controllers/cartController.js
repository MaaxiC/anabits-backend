import { ProductDao, CartDao } from "../daos/index.js"
import { ERRORS } from '../utils/index.js'

const CartApi = CartDao
const ProductApi = ProductDao
const initialCart = { productos: [], }

class CartController {
    static async createCart(req, res) {
        try {
            const { nombre } = req.body
            const cart = await CartApi.save({
                ...initialCart,
                nombre: nombre ?? "carritoPrueba",
            })
            const cartId = cart.id
            res.send({ id: cartId })
        } catch (error) {
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async deleteCart(req, res) {
        try {
            const cartID = req.params.id
            const cart = await CartApi.deleteById(cartID)
            if (cart.error || cart.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_CART })
            res.send({ status: "success", response: 'carrito eliminado correctamente' })
        } catch (error) {
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async getProductsInCart(req, res) {
        try {
            const cartID = req.params.id
            const cart = await CartApi.getById(cartID)
            if (!cart || cart.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_CART })
            res.send(cart)
        } catch (error) {
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async addProductsInCart(req, res) {
        try {
            const id = req.params.id
            const productID = req.body.productId
            const cart = await CartApi.getById(id)
            if (!cart || cart.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_CART })
            const product = await ProductApi.getById(productID)
            if (!product || product.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_PRODUCT })
            cart.productos.push(product)
            const updatedCart = await CartApi.update(id, cart)
            res.send(updatedCart)
        } catch (error) {
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async updateProductsInCart(req, res) {
        try {
            const id = req.params.id
            const productID = req.body.productId
            const cart = await CartApi.getById(id)
            const product = await ProductApi.getById(productID)
            if (!cart || cart.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_CART })
            if (!product || product.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_PRODUCT })
            cart.productos = cart.productos.filter((product) => product.id != productID)
            const updatedCart = await CartApi.update(id, cart)
            res.send(updatedCart)
        } catch (error) {
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async deleteProductInCart(req, res) {
        try {
            const cartID = req.params.id
            const productID = req.params.id_prod
            const cart = await CartApi.getById(cartID)
            if (!cart || cart.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_CART })
            const newCart = cart.productos
            const exist = newCart.find(product => product.id == productID)
            if (!exist) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_PRODUCT })
            const newArray = newCart.filter(product => product.id != productID)
            cart.productos = newArray
            const cartUpdated = await CartApi.update(cartID, cart)
            if (!cartUpdated || cartUpdated.kind) return res.status(404).send({ status: "error", error: 'error al borrar el producto' }) 
            res.send({ status: "success", response: 'producto eliminado correctamente' })
        } catch (error) {
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }
}

export { CartController }