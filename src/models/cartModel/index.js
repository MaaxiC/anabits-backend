import mongoose from "mongoose"
import { ProductSchema } from "../index.js"
import { config } from "../../config/index.js"

const { Schema, model } = mongoose

const CartCollection = config.DB.carts

const CartSchema = new Schema({
    timestamp: { type: String, required: true },
    productos: [ProductSchema],
},
{
    virtuals: true
}
)

CartSchema.set("toJSON", {
    transform: (_, response) => {
      response.id = response._id
      delete response._id
      return response
    },
})
  
const CartModel = model(CartCollection, CartSchema)

export { CartModel, CartSchema }

    