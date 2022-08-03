import { MongodbContainer } from '../../api/mongodbContainer.js'
import CartSchema from '../../schemas/CartSchema.js'

class CartMongodb extends MongodbContainer {
    constructor() {
        super('carritos', CartSchema)
    }
}

export default CartMongodb