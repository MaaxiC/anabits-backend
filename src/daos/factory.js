import { config } from "../config/index.js"
import MongoClient from "./mongoClient.js"

const PERSISTENCE = config.server.SELECTED_PERSISTENCE

export class PersistenceFactory {
  static getPersistence = async () => {
    switch (PERSISTENCE) {
      case config.persistences.filesystem:
        const { ProductFile: ProductFileDao } = await import(
          "./products/productFile.js"
        )
        const { CartFile: CartFileDao } = await import(
          "./carts/cartFile.js"
        )
        const { MessageFile: MessageFileDao } = await import(
          "./messages/messageFile.js"
        )
        const { ProductFile: UserFileDao } = await import(
          "./products/productFile.js"
        )
        return {
          products: new ProductFileDao(),
          carts: new CartFileDao(),
          messages: new MessageFileDao(),
          users: new UserFileDao(),
        }
      case config.persistences.mongodb:
        MongoClient.getInstance()
        const { ProductMongodb: ProductMongodbDao } = await import(
          "./products/productMongodb.js"
        )
        const { CartMongodb: CartMongodbDao } = await import(
          "./carts/cartMongodb.js"
        )
        const { MessageMongodb: MessageMongodbDao } = await import(
          "./messages/messageMongodb.js"
        )
        const { ProductMongodb: UserMongodbDao } = await import(
          "./products/productMongodb.js"
        )
        return {
          products: new ProductMongodbDao(),
          carts: new CartMongodbDao(),
          messages: new MessageMongodbDao(),
          users: new UserMongodbDao(),
        }
      case config.persistences.sqldb:
        const { ProductSqldb: ProductSqldbDao } = await import(
          "./products/productSqldb.js"
        )
        const { CartSqldb: CartSqldbDao } = await import(
          "./carts/cartSqldb.js"
        )
        const { MessageSqldb: MessageSqldbDao } = await import(
          "./messages/messageSqldb.js"
        )
        const { ProductSqldb: UserSqldbDao } = await import(
          "./products/productSqldb.js"
        )
        return {
          products: new ProductSqldbDao(),
          carts: new CartSqldbDao(),
          messages: new MessageSqldbDao(),
          users: new UserSqldbDao(),
        }
      default:
        const { ProductMemory: ProductMemoryDao } = await import(
          "./products/productMemory.js"
        )
        const { CartMemory: CartMemoryDao } = await import(
          "./carts/cartMemory.js"
        )
        const { MessageMemory: MessageMemoryDao } = await import(
          "./messages/messageMemory.js"
        )
        const { ProductMemory: UserMemoryDao } = await import(
          "./products/productMemory.js"
        )
        return {
          products: new ProductMemoryDao(),
          carts: new CartMemoryDao(),
          messages: new MessageMemoryDao(),
          users: new UserMemoryDao(),
        }
    }
  }
}
