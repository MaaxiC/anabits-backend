import mongoose from "mongoose"
import { config } from "../../config/index.js"

const { Schema, model } = mongoose

const MessageCollection = config.DB.messages

const MessageSchema = new Schema({
    author: {
        email: { type: String, required: true, max: 100 },
        nombre: { type: String, required: true, max: 100 },
        apellido: { type: String, required: true, max: 100 },
        edad: { type: Number, required: true, max: 100 },
        alias: { type: String, required: true, max: 100 },
        avatar: { type: String, required: true, max: 300 },
    },
    text: { type: String, required: true, max: 300 },
    timestamp: { type: String, required: true, max: 100},
},
{
    virtuals: true
})

MessageSchema.set("toJSON", {
    transform: (_, response) => {
      response.id = response._id
      delete response._id
      return response
    },
})

const MessageModel = model(MessageCollection, MessageSchema)

export { MessageModel, MessageSchema }