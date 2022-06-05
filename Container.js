const fs = require('fs')

class Container {
    constructor (fileName){
        this.fileName  = fileName
    }

    async save(obj) {
        try {
            const array = await this.getAll()
            const newID = array.length === 0 ? 1 : array[array.length - 1].id + 1
            obj.id = newID
            array.push(obj)
            await fs.promises.writeFile(this.fileName, JSON.stringify(array, null, 3))
            return newID
        } catch (error) {
            console.log('Error al escribir en el archivo')
            return error
        }
    }

    async getById(id) {
        try {
            const array = await this.getAll()
            const element = array.find(value => value.id === id)
            return element
        } catch (error) {
            console.log(error)
        }
        
    }

    async getAll() {
        try {
            const array = await fs.promises.readFile(this.fileName, 'utf8')
            return JSON.parse(array)
        } catch (error) {
            const array = []
            await fs.promises.writeFile(this.fileName, JSON.stringify(array))
            return array
        }
    }

    async deleteById(id) {
        try {
            const array = await this.getAll()
            const newArray = array.filter(value => value.id != id)
            await fs.promises.writeFile(this.fileName, JSON.stringify(newArray, null, 3))
            return 'Se elimino el producto'
        } catch (error) {
            console.log('Error al eliminar el producto')
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify([]))
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Container

