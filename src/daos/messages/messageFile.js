import { FileContainer } from '../../api/index.js'
import { config } from '../../config/index.js'

class MessageFile extends FileContainer {
    constructor() {
        super(config.DB.messages)
    }
}

export { MessageFile }