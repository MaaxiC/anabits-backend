import { Router } from 'express'
import { DATE, JOI_VALIDATOR, ERRORS } from '../utils/index.js'
import { UserModel } from "../models/index.js"

const sessionRouter = Router()

sessionRouter.post('/register', async (req, res) => {
    try {
        const { nombre, apellido, email, contrasena, alias, avatar, edad } = req.body
        const exists = await UserModel.findOne({ email: email }) 
        if (exists) return res.status(400).send({ error: "el mail ya se encuentra registrado" })
        const user = await JOI_VALIDATOR.user.validateAsync({
            nombre, 
            apellido, 
            email, 
            contrasena, 
            alias, 
            avatar, 
            edad,
        })
        user.timestamp = DATE.getTimestamp()
        const result = await UserModel.create(user)
        res.send({ status: "success", payload: result })
    } catch (error) {
        res.send({ error: 'verifique los datos cargados y vuelva a intentarlo' })
    }
})

sessionRouter.post('/login', async (req, res) => {
    try {
        const { email, contrasena } = req.body
        if (!email || !contrasena) return res.status(400).send({ error: "complete todos los campos"})
        const user = await UserModel.findOne({ $and: [{ email: email }, { contrasena: contrasena }] }, {nombre: 1, apellido: 1, email: 1})
        if (!user) return res.status(400).send({ error: ERRORS.MESSAGES.NO_USER })
        req.session.user = user
        res.send({ status: "success", payload: user })
    } catch (error) {
        res.send({error: 'se produjo un error, vuelva a intentarlo'})
    }
})

sessionRouter.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ error: "error" })
        res.send({ status: "success", payload: "succesfully loged out" })
    })
})

export { sessionRouter }