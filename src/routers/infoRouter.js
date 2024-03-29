import { Router } from 'express'
import os from "os"

const infoRouter = Router()
const CPUs = os.cpus().length;

infoRouter.get('/', async(req,res) => {
    let info = {
        argumentosDeEntrada: process.argv.slice(2),
        sistemaOperativo: process.platform,
        versionNode: process.version,
        memoriaReservada: process.memoryUsage(),
        pathDeEjec: process.title,
        processId: process.pid,
        carpetaDeProyecto: process.cwd(),
        numeroDeNucleos: CPUs,
    }
    res.send(info)
})

export { infoRouter }