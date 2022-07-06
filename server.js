import express from 'express'
import { productRouter } from './src/routers/productRouter.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/productos', productRouter)

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const products = []
    res.render('./ejs/index', {products})
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`listening on http://localhost:${server.address().port}`)
})
server.on('error', err => console.log(`Error on server ${err}`))