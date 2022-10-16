import knex from 'knex'
import { config } from "../src/config/index.js";

const createTableProducts = async (knexConfig) => {
    try {
        await knexConfig.schema.dropTableIfExists('productos')

        await knexConfig.schema.createTable('productos', table => {
            table.increments('id').primary()
            table.string('nombre').notNullable()
            table.string('descripcion')
            table.string('codigo')
            table.string('foto')
            table.integer('precio').notNullable()
            table.integer('stock')
            table.string('timestamp')
        })
        console.log('Tabla productos creada')
    } catch (error) {
        return error
    }
}

const createTableMessages = async (knexConfig) => {
    try {
        await knexConfig.schema.dropTableIfExists('mensajes')

        await knexConfig.schema.createTable('mensajes', table => {
            table.increments('id').primary()
            table.string('email')
            table.string('message')
            table.string('timestamp')
        })
        console.log('Tabla mensajes creada')
    } catch (error) {
        return error
    }
}

const knex_mariadb = knex(config.SQL_DB)

createTableProducts(knex_mariadb)
createTableMessages(knex_mariadb)