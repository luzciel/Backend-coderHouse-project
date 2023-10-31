const authorization = (role) => {
  return async (req, res, next) => {
    if (req.user.role !== role) {
      if (role === 'administrador') return res.status(403).send({ error: 'only admin can access' })
      if (role === 'usuario') return res.status(403).send({ error: 'only user can access' })
      return res.status(403).send({ error: 'forbidden' })
    }

    next()
  }
}

module.exports = { authorization }