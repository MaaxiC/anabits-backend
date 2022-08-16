import dotenv from "dotenv";
dotenv.config();

const DEV_PORT = 8080;

const PERSISTENCE = {
  mongodb: "mongodb",
  filesystem: "filesystem",
  memory: "memory",
  sqldb: "sqldb",
  firebase: "firebase",
};

const config = {
  persistences: PERSISTENCE,
  DB: {
    products: "productos",
    carts: "carritos",
  },
  MONGO_DB: {
    URL: process.env.Mongo_URL,
    DB_NAME: process.env.MONGO_DB_NAME,
  },
  SQL_DB: {
    client: 'mysql',
        connection: {
            host : '127.0.0.1',
            port : 3306,
            user : 'root',
            password : '',
            database : 'ecommerce'
    },
  },
  server: {
    PORT: process.env.PORT ?? DEV_PORT,
    SELECTED_PERSISTENCE: process.env.SELECTED_PERSISTENCE ?? PERSISTENCE.filesystem,
    routes: {
      base: "/api",
      products: "/api/productos",
      carts: "/api/carrito",
    },
  },
};

export { config };