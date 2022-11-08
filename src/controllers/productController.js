import { ERRORS, JOI_VALIDATOR } from '../utils/index.js'
import ProductService from '../services/productService.js'
import { ProductDTO } from '../dtos/productDTO.js'

class ProductController {
    static async getProducts(req, res) {
        try {
            const products = await ProductService.getProducts()
            let parsedProducts = products.map(product => new ProductDTO(product))
            res.send(parsedProducts)
        } catch (error) {
            req.logger.error(error.message)
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async getProductById(req, res) {
        try {
            const productID = req.params.id
            const product = await ProductService.getProduct(productID)
            if (!product || product.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_PRODUCT })
            let parsedProduct = new ProductDTO(product)
            res.send(parsedProduct)
        } catch (error) {
            req.logger.error(error.message)
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async createProduct(req, res) {
        try {
            const { nombre, descripcion, codigo, foto, precio, stock } = req.body
            const product = await JOI_VALIDATOR.product.validateAsync({
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock,
            })
            const productSaved = await ProductService.addProduct(product)
            res.send(productSaved)
        } catch (error) {
            if (error._original) return res.status(400).send({ status: "error", error: error.details[0].message })
            req.logger.error(error.message)
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async updateProduct(req, res) {
        try {
            const productID = req.params.id
            const { nombre, descripcion, codigo, foto, precio, stock } = req.body
            const product = await JOI_VALIDATOR.product.validateAsync({
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock,
            })
            const productSaved = await ProductService.updateProduct(productID, product)
            if (!productSaved || productSaved.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_PRODUCT })
            res.send(productSaved)
        } catch (error) {
            if (error._original) return res.status(400).send({ status: "error", error: error.details[0].message })
            req.logger.error(error.message)
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async deleteProduct(req, res) {
        try {
            const productID = req.params.id
            const response = await ProductService.deleteProduct(productID)
            if (!response || response.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_PRODUCT })
            res.send({ status: "success", response: 'producto eliminado correctamente' })
        } catch (error) {
            req.logger.error(error.message)
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }
}

export { ProductController }