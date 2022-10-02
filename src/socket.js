import { normalize, schema } from 'normalizr'
import { MessageDao } from "./daos/index.js"
import { JOI_VALIDATOR } from './utils/index.js'
import { debugLogger } from './utils.js'

const socket = (io) => {
    const MessageApi = MessageDao
    const authorSchema = new schema.Entity('authors', {}, {idAttribute: 'email'})
    const messageSchema = new schema.Entity('messages', { 
        author: authorSchema
    })
    const chatSchema = new schema.Entity('chats', { 
        messages: [messageSchema]
    })

    io.on('connection', async socket => {
        socket.emit('listOfMessages', await MessageApi.getAll())
        socket.on('sendMessage', async data => {
            try {
                const { email, nombre, apellido, edad, alias, avatar } = data.author
                const { text, timestamp } = data
                const message = await JOI_VALIDATOR.message.validateAsync({
                    author: { 
                        email,
                        nombre,
                        apellido,
                        edad,
                        alias,
                        avatar,
                    },
                    text,
                })
                message.timestamp = timestamp
                await MessageApi.save(message)
                const getMessages = await MessageApi.getAll()
                const getList = getMessages.map( message => ({
                    id: message._id,
                    author: { 
                        email: message.author.email,
                        nombre: message.author.nombre,
                        apellido: message.author.apellido,
                        edad: message.author.edad,
                        alias: message.author.alias,
                        avatar: message.author.avatar,
                    },
                    text: message.text,
                    timestamp: message.timestamp,
                }))
                const listMessages = {
                    id: 'mensajes',
                    messages: getList,
                }
                const normalizedObject = normalize(listMessages, chatSchema)
                io.sockets.emit('listOfMessages', await MessageApi.getAll())
                return console.log(JSON.stringify(normalizedObject, null, '\t'))
            } catch (error) {
                debugLogger.error(error.message)
                console.log({ error: 'error al enviar el mensaje' })
                return 
            }
        })
    })
}

export { socket }