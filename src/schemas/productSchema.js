import mongoose from "mongoose"

const { Schema } = mongoose

const ProductSchema = new Schema({
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 300 },
    codigo: { type: String, required: true, max: 20 },
    foto: { type: String, required: true, max: 500 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    timestamp: { type: String, required: true },
})

export default ProductSchema