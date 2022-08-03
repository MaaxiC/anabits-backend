import { knex_mariadb, knex_sqlite3 } from "../src/options/config.js";

const createTableProducts = async (config) => {
    try {
        await config.schema.dropTableIfExists('productos')

        await config.schema.createTable('productos', table => {
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

const createTableMessages = async (config) => {
    try {
        await config.schema.dropTableIfExists('mensajes')

        await config.schema.createTable('mensajes', table => {
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

createTableProducts(knex_mariadb)
createTableMessages(knex_mariadb)