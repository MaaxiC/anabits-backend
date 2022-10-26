import { MongodbContainer } from '../../api/index.js'
import { config } from '../../config/index.js'
import { UserSchema } from "../../models/index.js"

class UserMongodb extends MongodbContainer {
  constructor() {
    super({ collection: config.DB.users, schema: UserSchema })
  }
}

export { UserMongodb }