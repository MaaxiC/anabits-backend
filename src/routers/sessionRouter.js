import { Router } from 'express'
import { validUser, upload } from '../middlewares/index.js'
import passport from 'passport'
import { SessionController } from "../controllers/index.js"

const sessionRouter = Router()

sessionRouter.post('/register', upload, validUser, passport.authenticate('register', { failureRedirect: '/api/sessions/registerfail' }), SessionController.signup)

sessionRouter.get('/registerfail', SessionController.failSignup)

sessionRouter.post('/login', passport.authenticate('login', { failureRedirect:'/api/sessions/loginfail' }), SessionController.loginSuccess)

sessionRouter.get('/loginfail', SessionController.loginFail)

sessionRouter.get('/logout', SessionController.logout)

export { sessionRouter }