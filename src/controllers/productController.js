import { ProductDao } from "../daos/index.js"
import { ERRORS, JOI_VALIDATOR } from '../utils/index.js'

const ProductApi = ProductDao

class ProductController {
    static async getProducts(req, res) {
        try {
            const products = await ProductApi.getAll()
            res.send(products)
        } catch (error) {
            req.logger.error(error.message)
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }

    static async getProductById(req, res) {
        try {
            const productID = req.params.id
            const product = await ProductApi.getById(productID)
            if (!product || product.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_PRODUCT })
            res.send(product)
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
            const productSaved = await ProductApi.save(product)
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
            const productSaved = await ProductApi.update(productID, product)
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
            const response = await ProductApi.deleteById(productID)
            if (!response || response.kind) return res.status(404).send({ status: "error", error: ERRORS.MESSAGES.NO_PRODUCT })
            res.send({ status: "success", response: 'producto eliminado correctamente' })
        } catch (error) {
            req.logger.error(error.message)
            res.status(500).send({ status: "error", error: ERRORS.MESSAGES.INTERNAL_ERROR })
        }
    }
}

export { ProductController }