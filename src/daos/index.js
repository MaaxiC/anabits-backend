import { config } from "../config/index.js"
import { ProductFile, ProductMemory, ProductMongodb, ProductSqldb } from "./products/index.js"
import { CartFile, CartMemory, CartMongodb, CartSqldb } from "./carts/index.js"
//import ProductFirebase from './products/productFirebase.js'
//import CartFirebase from './carts/cartFirebase.js'

const getDaosBySelectedDB = ({ selectedPersistence }) => {
    switch (selectedPersistence) {
      case config.persistences.mongodb: {
        const ProductDao = new ProductMongodb()
        const CartDao = new CartMongodb()
        return { ProductDao, CartDao }
      }
      case config.persistences.filesystem: {
        const ProductDao = new ProductFile()
        const CartDao = new CartFile()
        return { ProductDao, CartDao }
      }
      case config.persistences.memory: {
        const ProductDao = new ProductMemory()
        const CartDao = new CartMemory()
        return { ProductDao, CartDao }
      }
      case config.persistences.sqldb: {
        const ProductDao = new ProductSqldb()
        const CartDao = new CartSqldb()
        return { ProductDao, CartDao }
      }
      default: {
        const ProductDao = new ProductMongodb()
        const CartDao = new ProductMongodb()
  
        return { ProductDao, CartDao }
      }
    }
  };
  
const { ProductDao, CartDao } = getDaosBySelectedDB({
    selectedPersistence: config.server.SELECTED_PERSISTENCE,
})

export { ProductDao, CartDao }