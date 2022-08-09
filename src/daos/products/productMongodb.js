import { MongodbContainer } from '../../api/index.js'
import { config } from '../../config/index.js'
import { ProductSchema } from '../../models/index.js'

class ProductMongodb extends MongodbContainer {
    constructor() {
        super({ collection: config.DB.products, schema: ProductSchema })
    }
}

export { ProductMongodb }