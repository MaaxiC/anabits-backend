import { config } from "../config/index.js"
import { ProductFile, ProductMemory, ProductMongodb, ProductSqldb, ProductFirebase } from "./products/index.js"
import { CartFile, CartMemory, CartMongodb, CartSqldb, CartFirebase } from "./carts/index.js"
import { MessageFile, MessageMemory, MessageMongodb, MessageSqldb, MessageFirebase } from "./messages/index.js"
import { UserMongodb } from './users/index.js'

const getDaosBySelectedDB = ({ selectedPersistence }) => {
    switch (selectedPersistence) {
      case config.persistences.mongodb: {
        const ProductDao = new ProductMongodb()
        const CartDao = new CartMongodb()
        const MessageDao = new MessageMongodb()
        const UserDao = new UserMongodb()
        return { ProductDao, CartDao, MessageDao, UserDao }
      }
      case config.persistences.firebase: {
        const ProductDao = new ProductFirebase()
        const CartDao = new CartFirebase()
        const MessageDao = new MessageFirebase()
        const UserDao = new UserMongodb()
        return { ProductDao, CartDao, MessageDao, UserDao }
      }
      case config.persistences.filesystem: {
        const ProductDao = new ProductFile()
        const CartDao = new CartFile()
        const MessageDao = new MessageFile()
        const UserDao = new UserMongodb()
        return { ProductDao, CartDao, MessageDao, UserDao }
      }
      case config.persistences.memory: {
        const ProductDao = new ProductMemory()
        const CartDao = new CartMemory()
        const MessageDao = new MessageMemory()
        const UserDao = new UserMongodb()
        return { ProductDao, CartDao, MessageDao, UserDao }
      }
      case config.persistences.sqldb: {
        const ProductDao = new ProductSqldb()
        const CartDao = new CartSqldb()
        const MessageDao = new MessageSqldb()
        const UserDao = new UserMongodb()
        return { ProductDao, CartDao, MessageDao, UserDao }
      }
      default: {
        const ProductDao = new ProductMongodb()
        const CartDao = new ProductMongodb()
        const MessageDao = new MessageMongodb()
        const UserDao = new UserMongodb()
        return { ProductDao, CartDao, MessageDao, UserDao }
      }
    }
  };
  
const { ProductDao, CartDao, MessageDao, UserDao } = getDaosBySelectedDB({
    selectedPersistence: config.server.SELECTED_PERSISTENCE,
})

export { ProductDao, CartDao, MessageDao, UserDao }