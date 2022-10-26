import { Router } from 'express'
import { validUser, upload } from '../middlewares/index.js'
import passport from 'passport'
import { UserController } from "../controllers/index.js"

const sessionRouter = Router()

sessionRouter.post('/register', upload, validUser, passport.authenticate('register', { failureRedirect: '/api/sessions/registerfail' }), UserController.signup)

sessionRouter.get('/registerfail', UserController.failSignup)

sessionRouter.post('/login', passport.authenticate('login', { failureRedirect:'/api/sessions/loginfail' }), UserController.loginSuccess)

sessionRouter.get('/loginfail', UserController.loginFail)

sessionRouter.get('/logout', UserController.logout)

export { sessionRouter }