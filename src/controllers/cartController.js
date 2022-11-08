import { ERRORS } from '../utils/index.js'
import CartService from '../services/cartService.js'
import ProductService from '../services/productService.js'

const initialCart = { productos: [], }

class CartController {
    static async createCart() {
        try {
            const cart = await CartService.addCart({
                ...initialCart
            })
            return cart.id
        } catch (error) {
            console.log({ status: "error", error: error.message })
        }
    }

    static async deleteCart(req, res) {
        try {
            const cartID = req.params.id
            const cart = await CartService.deleteCart(cartID)
            if (!cart || cart.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_CART })
            res.send({ status: "success", response: 'carrito eliminado correctamente' })
        } catch (error) {
            req.logger.error(error.message)
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async getProductsInCart(req, res) {
        try {
            const cartID = req.params.id
            const cart = await CartService.getCart(cartID)
            if (!cart || cart.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_CART })
            res.send(cart)
        } catch (error) {
            req.logger.error(error.message)
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async addProductsInCart(req, res) {
        try {
            const id = req.params.id
            const productID = req.body.productId
            const cart = await CartService.getCart(id)
            if (!cart || cart.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_CART })
            const product = await ProductService.getProduct(productID)
            if (!product || product.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_PRODUCT })
            cart.productos.push(product)
            const updatedCart = await CartService.updateCart(id, cart)
            res.send(updatedCart)
        } catch (error) {
            req.logger.error(error.message)
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async updateProductsInCart(req, res) {
        try {
            const id = req.params.id
            const productID = req.body.productId
            const cart = await CartService.getCart(id)
            const product = await ProductService.getProduct(productID)
            if (!cart || cart.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_CART })
            if (!product || product.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_PRODUCT })
            cart.productos = cart.productos.filter((product) => product.id != productID)
            const updatedCart = await CartService.updateCart(id, cart)
            res.send(updatedCart)
        } catch (error) {
            req.logger.error(error.message)
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async deleteProductInCart(req, res) {
        try {
            const cartID = req.params.id
            const productID = req.params.id_prod
            const cart = await CartService.getCart(cartID)
            if (!cart || cart.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_CART })
            const newCart = cart.productos
            const exist = newCart.find(product => product.id == productID)
            if (!exist) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_PRODUCT })
            const newArray = newCart.filter(product => product.id != productID)
            cart.productos = newArray
            const cartUpdated = await CartService.updateCart(cartID, cart)
            if (!cartUpdated || cartUpdated.kind) return res.status(404).send({ status: "error", error: 'error al borrar el producto' }) 
            res.send({ status: "success", response: 'producto eliminado correctamente' })
        } catch (error) {
            req.logger.error(error.message)
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }
}

export { CartController }