import { FirebaseContainer } from '../../api/index.js'
import { config } from '../../config/index.js'

class ProductFirebase extends FirebaseContainer {
    constructor() {
        super({ collection: config.DB.products })
    }
}

export { ProductFirebase }