import express from 'express'
import { normalize, schema } from 'normalizr'
import { config } from "./config/index.js"
import { MongodbService } from "./services/index.js"
import { MessageDao } from "./daos/index.js"
import { JOI_VALIDATOR } from './utils/index.js'
import { __dirname } from './utils.js'
import MongoStore from "connect-mongo"
import session from "express-session"
import path from 'path'
import passport from 'passport'
import { initializePassport } from './config/passport.js'

//Routers
import { productRouter, cartRouter, productTestRouter, viewsRouter, sessionRouter } from './routers/index.js'

//Websocket
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
const MessageApi = MessageDao
const authorSchema = new schema.Entity('authors', {}, {idAttribute: 'email'})
const messageSchema = new schema.Entity('messages', { 
    author: authorSchema
})
const chatSchema = new schema.Entity('chats', { 
    messages: [messageSchema]
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

//Messages
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
            console.log({ error: 'error al enviar el mensaje' })
            return 
        }
    })
})

MongodbService.init()

const server = httpServer.listen(config.server.PORT, () => {
    console.log(`listening on http://localhost:${server.address().port}`)
})
server.on('error', err => console.log(`Error on server ${err}`))

app.use(session({ 
    store: MongoStore.create({
        mongoUrl: config.MONGO_DB.URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl: 600
    }),
    secret: 'secretKeyAnabitsBackEnd',
    resave: false,
    saveUninitialized: false,
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/', viewsRouter)
app.use(config.server.routes.products, productRouter)
app.use(config.server.routes.carts, cartRouter)
app.use(config.server.routes.productsTest, productTestRouter)
app.use(config.server.routes.sessions, sessionRouter)
app.use((req, res) => {
    res.send({
        error: {
            'name': 'Error',
            'status': 404,
            'message': 'Invalid Request',
            'statusCode': 404
        }
    })
})