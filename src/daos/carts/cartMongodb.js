import { MongodbContainer } from '../../api/index.js'
import { config } from '../../config/index.js'
import { CartSchema } from '../../models/index.js'

class CartMongodb extends MongodbContainer {
    constructor() {
        super({ collection: config.DB.carts, schema: CartSchema })
    }
}

export { CartMongodb }