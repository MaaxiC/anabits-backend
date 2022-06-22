import fs from 'fs'

class Api {
    constructor (fileName){
        this.fileName  = fileName
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

    async getById(id) {
        try {
            const array = await this.getAll()
            const element = array.find(value => value.id === id)
            return element
        } catch (error) {
            throw new Error({error: 'producto no encontrado'})
        }
    }

    async save(obj) {
        try {
            const array = await this.getAll()
            const newID = array.length === 0 ? 1 : array[array.length - 1].id + 1
            obj.id = newID
            array.push(obj)
            await fs.promises.writeFile(this.fileName, JSON.stringify(array, null, 3))
            return obj
        } catch (error) {
            throw new Error({error: 'error al escribir en el archivo'})
        }
    }

    async update(id, product) {
        try {
            const array = await this.getAll()
            array[id - 1] = {
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                id: id
            }
            await fs.promises.writeFile(this.fileName, JSON.stringify(array, null, 3))
            return array[id - 1]
        } catch (error) {
            throw new Error({error: 'producto no encontrado'})
        }
    }

    async deleteById(id) {
        try {
            const array = await this.getAll()
            const newArray = array.filter(value => value.id != id)
            await fs.promises.writeFile(this.fileName, JSON.stringify(newArray, null, 3))
            return 'Se elimino el producto'
        } catch (error) {
            throw new Error({error: 'producto no encontrado'})
        }
    }
}

export default Api