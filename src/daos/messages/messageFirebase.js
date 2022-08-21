import { FirebaseContainer } from '../../api/index.js'
import { config } from '../../config/index.js'

class MessageFirebase extends FirebaseContainer {
    constructor() {
        super({ collection: config.DB.messages })
    }
}

export { MessageFirebase }