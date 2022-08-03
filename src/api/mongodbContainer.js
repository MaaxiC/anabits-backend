import { DATE } from "../utils/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

try {
    await mongoose.connect(process.env.URLMongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('conectado a mongoDB')
} catch (error) {
    console.log('error al conectarse a mongoDB')
}

class MongodbContainer {
    constructor (collection, schema){
        this.collection  = mongoose.model(collection, schema);
    }

    async getAll() {
        try {
            let rows = await this.collection.find({})
            return rows
        } catch (error) {
            return []
        }
    }

    async getById(id) {
         try {
            const row = await this.collection.find({'_id': id}) 
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
            const row = await this.collection.create(obj)
            return row
        } catch (error) {
            throw new Error({error: 'error al guardar en la DB'})
        }
    }

    async update(id, data) {
        try {
            const row = await this.collection.updateOne({'_id': id}, {
                $set: data
            })
            if (row.acknowledged) {
                return { success: "actualizado correctamente" }
            }
        } catch (error) {
            return { error: "elemento no encontrado" }
        }
    }

    async deleteById(id) {
        try {
            const row = await this.collection.deleteOne({'_id': id})
            if (row.acknowledged) {
                return { success: "eliminado correctamente" }
            }
        } catch (error) {
            return { error: "elemento no encontrado" }
        }
    }
}

export { MongodbContainer }