import { Router } from 'express'
import { __dirname } from '../utils.js'
import { Admin } from "../middlewares/index.js"

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
    if(!req.session.user) return res.redirect('/login')
    res.render('index.ejs', { user: req.session.user })
})

viewsRouter.get('/addProduct', Admin, (req, res) => {
    if(!req.session.user) return res.redirect('/login')
    res.render('pages/form.ejs')
})

viewsRouter.get('/card', (req, res) => {
    res.sendFile(__dirname+'/views/partials/card.ejs')
})

viewsRouter.get('/profile', (req, res) => {
    if(!req.session.user) return res.redirect('/login')
    res.render('pages/profile.ejs', { user: req.session.user })
})

viewsRouter.get('/cart', (req, res) => {
    if(!req.session.user) return res.redirect('/login')
    res.render('pages/cart.ejs', { user: req.session.user })
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