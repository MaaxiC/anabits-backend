import { DATE } from "../utils/index.js";

class dbSqlContainer {
    constructor (config, table){
        this.config  = config
        this.table = table
    }

    async getAll() {
        try {
            let rows = await this.config.from(this.table).select('*')
            return rows
        } catch (error) {
            return []
        }
    }

    async getById(id) {
         try {
            const row = await this.config(this.table).select('*').where('id', id)
            if (row.length > 0) {
                return row
            } else {
                return undefined 
            }
         } catch (error) {
            return error
         }
    }

    async save(obj) {
        try {
            obj.timestamp = DATE.getTimestamp()
            await this.config(this.table).insert({
                nombre: obj.nombre, 
                descripcion: obj.descripcion, 
                codigo: obj.codigo, 
                foto: obj.foto,
                precio: obj.precio,
                stock: obj.stock,
                timestamp: obj.timestamp
            })
            return obj
        } catch (error) {
            throw new Error({error: 'error al guardar en la DB'})
        }
    }

    async update(id, data) {
        try {
            const row = await this.config(this.table).update({
                nombre: data.nombre, 
                descripcion: data.descripcion, 
                codigo: data.codigo, 
                foto: data.foto,
                precio: data.precio,
                stock: data.stock,
                timestamp: DATE.getTimestamp()
            }).where('id', id)
            if (row == 1) {
                return { success: "actualizado correctamente" }
            } else {
                return { error: "elemento no encontrado" }
            }
        } catch (error) {
            return error
        }
    }

    async deleteById(id) {
        try {
            const row = await this.config(this.table).where({ id: id }).del()
            if (row == 1) {
                return { success: "eliminado correctamente" }
            } else {
                return { error: "elemento no encontrado" }
            }
        } catch (error) {
            return error
        }
    }
}

export { dbSqlContainer }