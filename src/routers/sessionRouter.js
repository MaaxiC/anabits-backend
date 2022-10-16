import { Router } from 'express'
import { validUser, upload } from '../middlewares/index.js'
import passport from 'passport'

const sessionRouter = Router()

sessionRouter.post('/register', upload, validUser, passport.authenticate('register', { failureRedirect: '/api/sessions/registerfail' }), async (req, res) => {
    res.send({ status: "success", payload: req.user.id })
})

sessionRouter.get('/registerfail', async(req,res) => {
    res.status(500).send({ status: 'error', error: 'fallo al registrar el usuario, intente nuevamente' })
})

sessionRouter.post('/login', passport.authenticate('login', { failureRedirect:'/api/sessions/loginfail' }), async (req, res) => {
    req.session.user = {
        nombre: req.user.nombre,
        apellido: req.user.apellido,
        email: req.user.email,
        edad: req.user.edad,
        alias: req.user.alias,
        avatar: req.user.avatar,
        id: req.user.id,
        cart: req.user.cart
    }
    res.send({ status:"success", payload: req.user.id })
})

sessionRouter.get('/loginfail', (req,res) => {
    res.send({ status: 'error', error: 'fallo el inicio de sesion' })
})

sessionRouter.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "error al cerrar sesion" })
        res.send({ status: "success", payload: "sesion cerrada exitosamente" })
    })
})

export { sessionRouter }