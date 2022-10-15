import { JOI_VALIDATOR } from '../utils/index.js'

const validUser = async (req, res, next) => {
    try {
        const { nombre, apellido, email, password, alias, edad } = req.body
        await JOI_VALIDATOR.user.validateAsync({
            nombre, 
            apellido, 
            email, 
            password, 
            alias, 
            edad,
        })
        next()
    } catch (error) {
        res.status(400).send({ status: 'error', error: 'verifique los datos cargados y vuelva a intentarlo' })
    }
}

export { validUser }