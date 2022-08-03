import { MongodbContainer } from '../../api/mongodbContainer.js'
import ProductSchema from '../../schemas/productSchema.js'

class ProductMongodb extends MongodbContainer {
    constructor() {
        super('productos', ProductSchema)
    }
}

export default ProductMongodb