const ADMIN = true;

const Admin = (req, res, next) => {
  if (!ADMIN) res.send({ error: -1, descripcion: 'metodo no autorizado para la ruta especificada' })
  next()
}

export { Admin }