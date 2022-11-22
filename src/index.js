import express from 'express'
import { config } from "./config/index.js"
import { __dirname } from './utils.js'
import MongoStore from "connect-mongo"
import session from "express-session"
import { join } from 'path'
import passport from 'passport'
import { initializePassport } from './config/passport.js'
import { socket } from './socket.js'
import { logger } from './middlewares/index.js'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs.js'
import { resolvers } from './resolvers.js'

//Routers
import { productRouter, cartRouter, productTestRouter, viewsRouter, sessionRouter, infoRouter } from './routers/index.js'

//Websocket
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const sessionMiddleware = session({ 
    store: MongoStore.create({
        mongoUrl: config.MONGO_DB.URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl: 600
    }),
    secret: config.server.SESSION.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
})

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

socket(io)

app.use(logger())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, 'public')))

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

const server = httpServer.listen(config.server.PORT, () => {
    console.log(`listening on http://localhost:${server.address().port}`)
})
server.on('error', err => console.log(`Error on server ${err}`))

app.use(sessionMiddleware)

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    req.logger.info({ metodo: req.method, ruta: req.url })
    next()
});
app.use('/', viewsRouter)
app.use(config.server.routes.products, productRouter)
app.use(config.server.routes.carts, cartRouter)
app.use(config.server.routes.productsTest, productTestRouter)
app.use(config.server.routes.sessions, sessionRouter)
app.use(config.server.routes.info, infoRouter)

const aServer = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(aServer, {
    listen: { port: 4000 },
})
console.log(`🚀 Graphql Server ready at: ${url}`)

app.use((req, res) => {
    req.logger.warn({ metodo: req.method, ruta: req.url })
    res.status(404).send({ status: "warning", warning: "Ruta o metodo invalido" });
});