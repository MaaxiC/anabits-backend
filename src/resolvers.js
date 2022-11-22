import productService from "./services/productService.js"

export const resolvers = {
    Query: {
        getProducts: async () => {
            const products = await productService.getProducts()
            return products
        },
        getProduct: async (_,params) => {
            const product = await productService.getProduct(params.id)
            return product
        }
    },
    Mutation:{
        addProduct: async(_,params) =>{
            const product = params.createFields
            const result = await productService.addProduct(product)
            return result
        },
        updateProduct: async(_,params) =>{
            const { id, updateFields} = params
            let result = await productService.updateProduct(id, updateFields)
            return result
        },
        deleteProduct: async(_,params) =>{
            const { id } = params
            await productService.deleteProduct(id)
            return 'Producto eliminado'
        }
    }
}