import { FileContainer } from '../../api/index.js'
import { config } from '../../config/index.js'

class ProductFile extends FileContainer {
    constructor() {
        super(config.DB.products)
    }
}

export { ProductFile }