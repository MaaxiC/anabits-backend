import { SqldbContainer } from '../../api/sqldbContainer.js'
import { knex_mariadb } from '../../options/config.js'

class CartSqldb extends SqldbContainer {
    constructor() {
        super(knex_mariadb, 'carritos')
    }
}

export default CartSqldb