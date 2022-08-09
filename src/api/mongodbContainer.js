import { DATE } from "../utils/index.js";
import mongoose from "mongoose";

class MongodbContainer {
    constructor ({ collection, schema }){
        this.collection  = mongoose.model(collection, schema);
    }

    async getAll() {
        try {
            let rows = await this.collection.find({})
            return rows
        } catch (error) {
            return error
        }
    }

    async getById(id) {
         try {
            const row = await this.collection.findById(id) 
            //const row = await this.collection.find(id) 
            // if (row.length > 0) {
            //     return row
            // } else {
            //     return undefined 
            // }
            return row
         } catch (error) {
            return error
         }
    }

    async save(obj) {
        try {
            obj.timestamp = DATE.getTimestamp()
            const row = await this.collection.create(obj)
            return row
        } catch (error) {
            //throw new Error({error: 'error al guardar en la DB'})
            return error
        }
    }

    async update(id, data) {
        try {
            // const row = await this.collection.updateOne({'_id': id}, {
            //     $set: data
            // })
            // if (row.acknowledged) {
            //     return { success: "actualizado correctamente" }
            // }
            const response = await this.collection.findByIdAndUpdate(id, data, {
                new: true,
            });
            return response;
        } catch (error) {
            //return { error: "elemento no encontrado" }
            return error
        }
    }

    async deleteById(id) {
        try {
            // const row = await this.collection.deleteOne({'_id': id})
            // if (row.acknowledged) {
            //     return { success: "eliminado correctamente" }
            // }
            const response = await this.collection.findByIdAndDelete(id)
            return response
        } catch (error) {
            //return { error: "elemento no encontrado" }
            return error
        }
    }
}

export { MongodbContainer }