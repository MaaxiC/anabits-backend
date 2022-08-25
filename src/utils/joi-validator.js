import joi from "joi"

const product = joi.object({
  nombre: joi.string().min(2).max(100).required(),
  descripcion: joi.string().min(2).max(200).required(),
  codigo: joi.string().min(3).max(20).required(),
  foto: joi.string().min(5).max(300).required(),
  precio: joi.number().required(),
  stock: joi.number().required(),
})

const message = joi.object({
  author: {
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
    nombre: joi.string().min(2).max(100).required(),
    apellido: joi.string().min(2).max(100).required(),
    edad: joi.number().min(16).max(100).required(),
    alias: joi.string().min(2).max(100).required(),
    avatar: joi.string().min(13).max(100).required(),
  },
  text: joi.string().min(1).max(100).required(),
})

const user = joi.object({
  nombre: joi.string().min(2).max(100).required(),
  apellido: joi.string().min(2).max(100).required(),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
  contrasena: joi.string().min(2).max(100).required(),
  alias: joi.string().min(2).max(100).required(),
  avatar: joi.string().min(13).max(100).required(),
  edad: joi.number().min(16).max(100).required(),
})

export const JOI_VALIDATOR = {
  product,
  message,
  user
}