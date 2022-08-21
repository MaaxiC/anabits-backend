import knex from 'knex'
import { SqldbContainer } from '../../api/index.js'
import { config } from '../../config/index.js'

class MessageSqldb extends SqldbContainer {
    constructor() {
        super(knex(config.SQL_DB), config.DB.messages)
    }
}

export { MessageSqldb }