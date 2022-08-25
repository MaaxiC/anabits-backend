import { DATE } from "../utils/index.js"

class SqldbContainer {
    constructor (config, table){
        this.config  = config
        this.table = table
    }

    async getAll() {
        try {
            const rows = await this.config.from(this.table).select('*')
            return rows
        } catch (error) {
            return []
        }
    }

    async getById(id) {
         try {
            const row = await this.config(this.table).select('*').where('id', id)
            if (row.length = 0) { return undefined }
            return row
         } catch (error) {
            return error
         }
    }

    async save(obj) {
        try {
            obj.timestamp = DATE.getTimestamp()
            return this.knex.insert(obj).into(this.table)
        } catch (error) {
            throw new Error({error: 'error al guardar en la DB'})
        }
    }

    async update(id, data) {
        try {
            const row = this.config.from(this.table).where('id', id).update(data)
            if (row != 1) { return { error: "elemento no encontrado" } } 
            return { success: "actualizado correctamente" }
        } catch (error) {
            return error
        }
    }

    async deleteById(id) {
        try {
            const row = await this.config(this.table).where({ id: id }).del()
            if (row != 1) { return { error: "elemento no encontrado" } }
            return { success: "eliminado correctamente" }
        } catch (error) {
            return error
        }
    }
}

export { SqldbContainer }