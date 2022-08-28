import mongoose from "mongoose"
import { config } from "../../config/index.js"

const { Schema, model } = mongoose

const UserCollection = config.DB.users

const UserSchema = new Schema({
    nombre: { type: String, required: true, max: 100 },
    apellido: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    alias: { type: String, required: true, max: 100 },
    avatar: { type: String, required: true, max: 300 },
    edad: { type: Number, required: true,  },
    timestamp: { type: String, required: true },
},
{
    virtuals: true
})

UserSchema.set("toJSON", {
    transform: (_, response) => {
      response.id = response._id
      delete response._id
      return response
    },
})

const UserModel = model(UserCollection, UserSchema)

export { UserModel, UserSchema }