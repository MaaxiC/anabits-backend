import { FileContainer } from '../../api/fileContainer.js'

class ProductFile extends FileContainer {
    constructor() {
        super('../../data/products.json')
    }
}

export default ProductFile