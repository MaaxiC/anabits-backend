import express from 'express'
import { config } from "./config/index.js"
import { MongodbService } from "./services/index.js"
import { MessageDao } from "./daos/index.js"
import { JOI_VALIDATOR } from './utils/index.js'
import { normalize, schema } from 'normalizr'

//Routers
import { productRouter, cartRouter, productTestRouter } from './routers/index.js'

//Websocket
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
const MessageApi = MessageDao
const authorSchema = new schema.Entity('authors')
const messageSchema = new schema.Entity('messages', { 
    author: authorSchema
})
const chatSchema = new schema.Entity('chats', { 
    messages: [messageSchema]
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(config.server.routes.products, productRouter)
app.use(config.server.routes.carts, cartRouter)
app.use(config.server.routes.productsTest, productTestRouter)

app.set('views', './public/views');
app.set('view engine', 'ejs');

//Messages
io.on('connection', async socket => {
    socket.emit('listOfMessages', await MessageApi.getAll())
    socket.on('sendMessage', async data => {
        try {
            const { id, nombre, apellido, edad, alias, avatar } = data.author
            const { text, timestamp } = data
            const message = await JOI_VALIDATOR.message.validateAsync({
                author: { 
                    id,
                    nombre,
                    apellido,
                    edad,
                    alias,
                    avatar,
                },
                text,
                timestamp,
            })
            await MessageApi.save(message)
            const getMessages = await MessageApi.getAll()
            const getList = getMessages.map( message => ({
                id: message._id,
                author: { 
                    id: message.author.id,
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
            console.log({ error: 'error al enviar el mensaje' })
            return 
        }
    })
})

app.get('/addProduct', (req, res) => {
    res.render('./form.ejs')
})

app.get('/listProducts', (req, res) => {
    res.render('./listProducts.ejs')
})

app.get('/chat', (req, res) => {
    res.render('./chat.ejs')
})

app.use((req, res) => {
    res.json({
        error: {
            'name': 'Error',
            'status': 404,
            'message': 'Invalid Request',
            'statusCode': 404
        }
    });
});

MongodbService.init()

const server = httpServer.listen(config.server.PORT, () => {
    console.log(`listening on http://localhost:${server.address().port}`)
})
server.on('error', err => console.log(`Error on server ${err}`))