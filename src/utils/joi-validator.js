import joi from "joi"

const product = joi.object({
    nombre: joi.string().min(2).max(100).required(),
    descripcion: joi.string().min(2).max(200).required(),
    codigo: joi.string().min(3).max(20).required(),
    foto: joi.string().min(5).max(300).required(),
    precio: joi.number().required(),
    stock: joi.number().required(),
})

export const JOI_VALIDATOR = {
  product,
}