import { Router } from 'express'
import { __dirname } from '../utils.js'

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
    if(!req.session.user) return res.redirect('/login')
    res.render('index.ejs', { user: req.session.user })
})

viewsRouter.get('/addProduct', (req, res) => {
    if(!req.session.user) return res.redirect('/login')
    res.render('pages/form.ejs')
})

viewsRouter.get('/listProducts', (req, res) => {
    if(!req.session.user) return res.redirect('/login')
    res.render('pages/listProducts.ejs')
})

viewsRouter.get('/card', (req, res) => {
    res.sendFile(__dirname+'/views/partials/card.ejs')
})

viewsRouter.get('/chat', (req, res) => {
    if(!req.session.user) return res.redirect('/login')
    res.render('pages/chat.ejs')
})

viewsRouter.get('/register', (req, res) => {
    if(req.session.user) return res.redirect('/')
    res.render('pages/register.ejs')
})

viewsRouter.get('/login', (req, res) => {
    if(req.session.user) return res.redirect('/')
    res.render('pages/login.ejs')
})

export { viewsRouter }