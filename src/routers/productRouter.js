import { Router } from 'express'
import { Admin } from "../middlewares/index.js"
import { ProductController } from "../controllers/index.js"

const productRouter = Router()
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = ProductController

productRouter.get('/', getProducts)

productRouter.get('/:id', getProductById)

productRouter.post('/', Admin, createProduct)

productRouter.put('/:id', Admin, updateProduct)

productRouter.delete('/:id', Admin, deleteProduct)

export { productRouter }