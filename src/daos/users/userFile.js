import { FileContainer } from '../../api/index.js'
import { config } from '../../config/index.js'

class UserFile extends FileContainer {
    constructor() {
        super(config.DB.users)
    }
}

export { UserFile }