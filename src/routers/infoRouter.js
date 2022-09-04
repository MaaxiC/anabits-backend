import { Router } from 'express'

const infoRouter = Router()

infoRouter.get('/', async(req,res) => {
    let info = {
        argumentosDeEntrada: process.argv.slice(2),
        sistemaOperativo: process.platform,
        versionNode: process.version,
        memoriaReservada: process.memoryUsage(),
        pathDeEjec: process.title,
        processId: process.pid,
        carpetaDeProyecto: process.cwd()
    }
    res.send(info)
})

export { infoRouter }