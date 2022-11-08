import { PersistenceFactory } from "../daos/factory.js"

class MessageService {
    constructor() {
        this.messagesDao;
        this.init();
    }

    init = async () => {
        const { messages } = await PersistenceFactory.getPersistence();
        this.messagesDao = messages;
    }

    getMessages = async () => {
        return await this.messagesDao.getAll();
    }

    addMessage = async (message) => {
        return await this.messagesDao.save(message);
    }
}

const messageService = new MessageService();

export default messageService;