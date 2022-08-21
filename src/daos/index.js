import { config } from "../config/index.js"
import { ProductFile, ProductMemory, ProductMongodb, ProductSqldb, ProductFirebase } from "./products/index.js"
import { CartFile, CartMemory, CartMongodb, CartSqldb, CartFirebase } from "./carts/index.js"
import { MessageFile, MessageMemory, MessageMongodb, MessageSqldb, MessageFirebase } from "./messages/index.js"

const getDaosBySelectedDB = ({ selectedPersistence }) => {
    switch (selectedPersistence) {
      case config.persistences.mongodb: {
        const ProductDao = new ProductMongodb()
        const CartDao = new CartMongodb()
        const MessageDao = new MessageMongodb()
        return { ProductDao, CartDao, MessageDao }
      }
      case config.persistences.firebase: {
        const ProductDao = new ProductFirebase()
        const CartDao = new CartFirebase()
        const MessageDao = new MessageFirebase()
        return { ProductDao, CartDao, MessageDao }
      }
      case config.persistences.filesystem: {
        const ProductDao = new ProductFile()
        const CartDao = new CartFile()
        const MessageDao = new MessageFile()
        return { ProductDao, CartDao, MessageDao }
      }
      case config.persistences.memory: {
        const ProductDao = new ProductMemory()
        const CartDao = new CartMemory()
        const MessageDao = new MessageMemory()
        return { ProductDao, CartDao, MessageDao }
      }
      case config.persistences.sqldb: {
        const ProductDao = new ProductSqldb()
        const CartDao = new CartSqldb()
        const MessageDao = new MessageSqldb()
        return { ProductDao, CartDao, MessageDao }
      }
      default: {
        const ProductDao = new ProductMongodb()
        const CartDao = new ProductMongodb()
        const MessageDao = new MessageMongodb()
        return { ProductDao, CartDao, MessageDao }
      }
    }
  };
  
const { ProductDao, CartDao, MessageDao } = getDaosBySelectedDB({
    selectedPersistence: config.server.SELECTED_PERSISTENCE,
})

export { ProductDao, CartDao, MessageDao }