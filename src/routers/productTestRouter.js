import { Router } from 'express'
import faker from 'faker'

const productTestRouter = Router()
const { commerce, image } = faker

productTestRouter.get('/', async (req, res) => {
    try {
        const products = []
        for (let index = 0; index < 5; index++) {
            products.push({ 
                nombre: commerce.productName(),
                precio: commerce.price(),
                foto: image.imageUrl(),
            })
        }
        res.send(products)
    } catch (error) {
        res.send(error)
    }
})

export { productTestRouter }
