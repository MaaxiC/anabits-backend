import { Router } from 'express'
import { CartController } from "../controllers/index.js"

const cartRouter = Router()
const { deleteCart, getProductsInCart, addProductsInCart, updateProductsInCart, deleteProductInCart } = CartController

cartRouter.delete('/:id', deleteCart)

cartRouter.get('/:id/productos', getProductsInCart)

cartRouter.post('/:id/productos', addProductsInCart)

cartRouter.put("/:id/productos", updateProductsInCart)

cartRouter.delete('/:id/productos/:id_prod', deleteProductInCart)

export { cartRouter }