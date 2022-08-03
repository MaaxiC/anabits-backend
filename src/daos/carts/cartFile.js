import { FileContainer } from '../../api/fileContainer.js'

class CartFile extends FileContainer {
    constructor() {
        super('../../data/carts.json')
    }
}

export default CartFile