const Admin = (req, res, next) => {
  if (!req.session.user.admin) return res.send({ status: 'error', payload: 'metodo no autorizado para la ruta especificada' })
  next()
}

export { Admin }