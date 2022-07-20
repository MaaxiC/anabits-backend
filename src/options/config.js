import knex from 'knex'

const db_sqlite3 = {
    client: 'sqlite3',
    connection: {
      filename: "../../src/db/ecommerce.sqlite"
    },
    useNullAsDefault: true
};

const db_mariadb = {
    client: 'mysql',
        connection: {
            host : '127.0.0.1',
            port : 3306,
            user : 'root',
            password : '',
            database : 'db_anabits'
    },
}
  
export const knex_sqlite3 = knex(db_sqlite3)
export const knex_mariadb = knex(db_mariadb)