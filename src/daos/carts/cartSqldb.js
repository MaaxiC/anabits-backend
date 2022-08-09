import knex from 'knex'
import { SqldbContainer } from '../../api/index.js'
import { config } from '../../config/index.js'

class CartSqldb extends SqldbContainer {
    constructor() {
        super(knex(config.SQL_DB), config.DB.carts)
    }
}

export { CartSqldb }