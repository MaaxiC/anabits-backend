import mongoose from "mongoose"

const { Schema } = mongoose

const CartSchema = new Schema({
    timestamp: { type: String, required: true },
    productos: [{  nombre:      { type: String, required: true, max: 100 },
                  descripcion: { type: String, required: true, max: 300 },
                  codigo:      { type: String, required: true, max: 20 },
                  foto:        { type: String, required: true, max: 500 },
                  precio:      { type: Number, required: true },
    }],
})

export default CartSchema

    