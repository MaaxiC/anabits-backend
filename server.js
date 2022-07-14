import express from 'express'
import { productRouter, cartRouter } from './src/routers/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productRouter)
app.use('/api/carrito', cartRouter)

app.set('views', './public/views');
app.set('view engine', 'ejs');

app.get('/addProduct', (req, res) => {
    res.render('./form.ejs')
})

app.get('/listProducts', (req, res) => {
    res.render('./listProducts.ejs')
})

app.use((req, res) => {
    res.json({
        error: {
            'name':'Error',
            'status':404,
            'message':'Invalid Request',
            'statusCode':404
        }
    });
});

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`listening on http://localhost:${server.address().port}`)
})
server.on('error', err => console.log(`Error on server ${err}`))