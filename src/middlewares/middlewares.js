const authorization = (...role) => {
  return async (req, res, next) => {
    const rolAutorizado = req.user.role
    if (!role.includes(rolAutorizado)) {
      return res.status(403).send({ error: 'forbidden' })
    }
    next()
  }
}




module.exports = { authorization }