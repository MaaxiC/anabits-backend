import mongoose from "mongoose"
import ProductSchema from "./productSchema.js"

const { Schema } = mongoose

const CartSchema = new Schema({
    timestamp: { type: String, required: true },
    productos: { type: [ProductSchema], required: false },
})

export default CartSchema