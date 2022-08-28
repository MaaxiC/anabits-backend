import { JOI_VALIDATOR } from '../utils/index.js'

const validUser = async (req, res, next) => {
    try {
        const { nombre, apellido, email, password, alias, avatar, edad } = req.body
        const user = await JOI_VALIDATOR.user.validateAsync({
            nombre, 
            apellido, 
            email, 
            password, 
            alias, 
            avatar, 
            edad,
        })
        next()
    } catch (error) {
        res.send({ status: 'error', error: 'verifique los datos cargados y vuelva a intentarlo' })
    }
}

export { validUser }


        