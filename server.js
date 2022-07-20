import express from 'express'

//Routers
import { productRouter, cartRouter } from './src/routers/index.js'

//Websocket
import { createServer } from "http"
import { Server } from "socket.io"
import { ContainerArchivo } from './src/api/fileContainer.js'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
const logChat = new ContainerArchivo('./src/data/logChat.json')
const messages = await logChat.getAll()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productRouter)
app.use('/api/carrito', cartRouter)

app.set('views', './public/views');
app.set('view engine', 'ejs');

io.on('connection', socket => {
    socket.emit('listOfMessages', messages)

    //CAMBIAR PARA GUARDAR EN LA DB
    socket.on('sendMessage', async data => {
        await messages.push({ email: data.email, message: data.message, timestamp: data.timestamp })
        await logChat.save({ email: data.email, message: data.message, timestamp: data.timestamp })
        io.sockets.emit('listOfMessages', messages)
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

const PORT = 8080

const server = httpServer.listen(PORT, () => {
    console.log(`listening on http://localhost:${server.address().port}`)
})
server.on('error', err => console.log(`Error on server ${err}`))