import passport from 'passport'
import local from 'passport-local'
import { UserModel } from "../models/index.js"
import { createHash, validatePassword } from "../utils.js"
import { DATE } from '../utils/index.js'

const LocalStrategy = local.Strategy //local = username + password

const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
        try {
            const { nombre, apellido, alias, edad } = req.body
            const exists = await UserModel.findOne({ email: email })
            if (exists) {
                console.log({ status: 'error', error: 'el usuario ya se encuentra registrado' })
                return done(null, false)
            }
            const result = await UserModel.create({
                nombre, 
                apellido,
                email,
                password: createHash(password),
                alias, 
                avatar: req.file.path, 
                edad,
                timestamp: DATE.getTimestamp()
            })
            return done(null, result)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('login', new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try{
            if (!email || !password) {
                console.log({ status: 'error', error: 'complete todos los campos' })
                return done(null, false)
            }
            const user = await UserModel.findOne({ email: email })
            if (!user) { 
                console.log({ status: 'error', error: 'usuario no encontrado' })
                return done(null, false)
            }
            if (!validatePassword(user, password)) {
                console.log({ status: 'error', error: 'contraseña incorrecta' })
                return done(null, false)
            }
            return done(null, user)
        } catch(error){
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser( async (id, done) => {
        const result = await UserModel.findOne({ id: id })
        return done(null, result)
    })
}

export { initializePassport }