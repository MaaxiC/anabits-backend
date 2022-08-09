import knex from 'knex'
import { SqldbContainer } from '../../api/index.js'
import { config } from '../../config/index.js'

class ProductSqldb extends SqldbContainer {
    constructor() {
        super(knex(config.SQL_DB), config.DB.products)
    }
}

export { ProductSqldb }