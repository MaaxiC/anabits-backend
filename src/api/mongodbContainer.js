import { DATE } from "../utils/index.js"
import mongoose from "mongoose"

class MongodbContainer {
    constructor ({ collection, schema }){
        this.collection  = mongoose.model(collection, schema);
    }

    async getAll() {
        try {
            const rows = await this.collection.find({})
            return rows
        } catch (error) {
            return error
        }
    }

    async getById(id) {
         try {
            const row = await this.collection.findById(id) 
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
            return error
        }
    }

    async update(id, data) {
        try {
            const response = await this.collection.findByIdAndUpdate(id, data, {
                new: true,
            })
            return response
        } catch (error) {
            return error
        }
    }

    async deleteById(id) {
        try {
            const response = await this.collection.findByIdAndDelete(id)
            return response
        } catch (error) {
            return error
        }
    }
}

export { MongodbContainer }