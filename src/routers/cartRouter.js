import { Router } from 'express';
import { ContainerArchivo } from '../api/fileContainer.js'
import { ERRORS } from '../utils/index.js'

const cartRouter = Router()
const cartApi = new ContainerArchivo('./src/data/carts.json')
const productApi = new ContainerArchivo('./src/data/products.json')

const initialCart = { productos: [] }

cartRouter.post("/", async (req, res) => {
    try {
        const cart = await cartApi.save(initialCart);
        res.json({ id: cart.id });
    } catch (error) {
        res.json(error);
    }
})

cartRouter.delete('/:id', async (req, res) => {
    try {
        let cartID = parseInt(req.params.id)
        if (!isNaN(cartID)) {
            const cart = await cartApi.deleteById(cartID)
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
            const cart = await cartApi.getById(cartID)
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
            const cart = await cartApi.getById(id)
            if (!cart) {
                res.json({ error: ERRORS.MESSAGES.NO_CART })
            } else {
                const product = await productApi.getById(productID)
                if (!product) {
                    res.json({ error: ERRORS.MESSAGES.NO_PRODUCT })
                } else {
                    cart.productos.push(product)
                    const updatedCart = await cartApi.update(id, cart)
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
            const cart = await cartApi.getById(cartID)
            if (!cart) {
                res.json({ error: ERRORS.MESSAGES.NO_CART })
            } else {
                const exist = cart.productos.find(product => product.id === productID)
                if (!exist) {
                    res.json({ error: ERRORS.MESSAGES.NO_PRODUCT })
                } else {
                    const newArray = cart.productos.filter(product => product.id != productID)
                    const cartUpdated = await cartApi.update(cartID, { productos: newArray })
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