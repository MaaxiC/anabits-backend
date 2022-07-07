import express from 'express'
import { productRouter } from './src/routers/productRouter.js'
import { createServer } from "http"
import { Server } from "socket.io"
import { ContainerArchivo } from './src/api/containerArchivo.js'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
const logChat = new ContainerArchivo('./logChat.txt')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productRouter)

app.set('views', './views');
app.set('view engine', 'ejs');

const products = []
const messages = await logChat.getAll()

io.on('connection', socket => {

    socket.emit('listOfProducts', products)
    socket.emit('listOfMessages', messages)

    socket.on('addProduct', async data => {
        await products.push({ title: data.title, price: data.price, thumbnail: data.thumbnail })
        io.sockets.emit('listOfProducts', products)
    })

    socket.on('sendMessage', async data => {
        await messages.push({ email: data.email, message: data.message, timestamp: data.timestamp })
        await logChat.save({ email: data.email, message: data.message, timestamp: data.timestamp })
        io.sockets.emit('listOfMessages', messages)
    })
})

app.get('/', (req, res) => {
    res.render('./ejs/index', {products})
})

const PORT = 8080

const server = httpServer.listen(PORT, () => {
    console.log(`listening on http://localhost:${server.address().port}`)
})
server.on('error', err => console.log(`Error on server ${err}`))