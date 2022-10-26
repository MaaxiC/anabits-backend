import { UserDao } from "../daos/index.js"
import { ERRORS } from '../utils/index.js'

const UserApi = UserDao

class UserController {
    static async signup(req, res) {
        res.send({ status: "success", payload: req.user.id })
    }
    
    static async failSignup(req,res) {
        res.status(500).send({ status: 'error', error: 'fallo al registrar el usuario, intente nuevamente' })
    }

    static async loginSuccess(req, res) {
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
    }

    static async loginFail(req,res) {
        res.send({ status: 'error', error: 'fallo el inicio de sesion' })
    }

    static async logout(req, res) {
        req.session.destroy(err => {
            if (err) return res.status(500).send({ status: "error", error: "error al cerrar sesion" })
            res.send({ status: "success", payload: "sesion cerrada exitosamente" })
        })
    }
}

export { UserController };