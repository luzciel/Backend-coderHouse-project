const EErros = require('../../services/error/enums.js')

const handleError = (error, req, res, next) => {
  console.log("entro al handleError", error)
  switch (error.code) {
    case EErros.INVALID_TYPE_ERROR:
      res.status(400).send({ status:"erros", error: error.message })
      break;
    default:
      res.send({ status:"erros", error: "UnHandled Error" })
  }
}

module.exports = handleError