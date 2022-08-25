import fs from 'fs'
import { DATE } from "../utils/index.js"
import { __dirname } from '../utils.js'

class FileContainer {
    constructor (fileName){
        this.fileName  = `${__dirname}/db/filesystem/${fileName}.json`
    }

    async getAll() {
        try {
            const array = await fs.promises.readFile(this.fileName, 'utf8')
            return JSON.parse(array)
        } catch (error) {
            await fs.promises.writeFile(this.fileName, JSON.stringify([]))
            return []
        }
    }

    async getById(id) {
        try {
            const array = await this.getAll()
            const element = array.find(value => value.id == id)
            return element
        } catch (error) {
            return error
        }
    }

    async save(obj) {
        try {
            const array = await this.getAll()
            const newID = array.length === 0 ? 1 : array[array.length - 1].id + 1
            obj.id = newID
            obj.timestamp = DATE.getTimestamp()
            array.push(obj)
            await fs.promises.writeFile(this.fileName, JSON.stringify(array, null, 3))
            return obj
        } catch (error) {
            throw new Error({error: 'error al escribir en el archivo'})
        }
    }

    async update(id, data) {
        try {
            const array = await this.getAll();
            const elementIndex = array.findIndex((element) => element.id == id)
            if (elementIndex === -1) return { error: "elemento no encontrado" }
            array[elementIndex] = { ...array[elementIndex], ...data }
            await fs.promises.writeFile(this.fileName, JSON.stringify(array, null, 3))
            return array[elementIndex]
        } catch (error) {
            return error
        }
    }

    async deleteById(id) {
        try {
            const array = await this.getAll()
            const elementIndex = array.findIndex((element) => element.id == id)
            if (elementIndex === -1) return { error: "elemento no encontrado" }
            const newArray = array.filter(value => value.id != id)
            await fs.promises.writeFile(this.fileName, JSON.stringify(newArray, null, 3))
            return 'eliminado correctamente'
        } catch (error) {
            throw new Error({ error: 'elemento no encontrado' })
        }
    }
}

export { FileContainer }