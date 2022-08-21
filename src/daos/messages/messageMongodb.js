import { MongodbContainer } from '../../api/index.js'
import { config } from '../../config/index.js'
import { MessageSchema } from '../../models/index.js'

class MessageMongodb extends MongodbContainer {
    constructor() {
        super({ collection: config.DB.messages, schema: MessageSchema })
    }
}

export { MessageMongodb }