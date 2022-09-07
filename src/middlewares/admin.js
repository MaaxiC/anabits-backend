const ADMIN = true

const Admin = (req, res, next) => {
  if (!ADMIN) return res.send({ error: -1, descripcion: 'metodo no autorizado para la ruta especificada' })
  next()
}

export { Admin }