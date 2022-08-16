import { FirebaseContainer } from '../../api/index.js'
import { config } from '../../config/index.js'

class CartFirebase extends FirebaseContainer {
    constructor() {
        super({ collection: config.DB.carts })
    }
}

export { CartFirebase }