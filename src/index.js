import express from 'express'
import knex from 'knex'
import { config } from "./config/index.js"
import { SqldbContainer } from './api/sqldbContainer.js'
import { MongodbService } from "./services/index.js"

//Routers
import { productRouter, cartRouter } from './routers/index.js'

//Websocket
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
const logChat = new SqldbContainer(knex(config.SQL_DB), 'mensajes')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(config.server.routes.products, productRouter)
app.use(config.server.routes.carts, cartRouter)

app.set('views', './public/views');
app.set('view engine', 'ejs');

io.on('connection', async socket => {
    socket.emit('listOfMessages', await logChat.getAll())

    socket.on('sendMessage', async data => {
        await logChat.save(data)
        io.sockets.emit('listOfMessages', await logChat.getAll())
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