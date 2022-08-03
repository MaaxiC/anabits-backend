import { SqldbContainer } from '../../api/sqldbContainer.js'
import { knex_mariadb } from '../../options/config.js'

class ProductSqldb extends SqldbContainer {
    constructor() {
        super(knex_mariadb, 'productos')
    }
}

export default ProductSqldb