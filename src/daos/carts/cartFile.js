import { FileContainer } from '../../api/index.js'
import { config } from '../../config/index.js'

class CartFile extends FileContainer {
    constructor() {
        super(config.DB.carts)
    }
}

export { CartFile }