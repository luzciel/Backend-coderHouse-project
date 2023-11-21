
const config = require("../../config/config.js");
const jwt = require("jsonwebtoken");
const handleError = require("../../util/handleError.js");
const {userServices} = require("../../repositories/index.js");
const {restorePasswordEmail} =require('../../util/nodemailer.js');

const KEY_JWT = config.KEY_JWT;
const passwordRecovery = async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ status: "error", payload: "Faltan datos" });
  }

  try {
    const user = await userServices.getUser(email);
    
    if(!user) {
      return res.status(400).send({ status: "error", payload: "Usuario no encontrado" });
    }

    const id = getToken(email)
    const linkRestore = `http://localhost:8080/restore/${id}`

    restorePasswordEmail({email, linkRestore});

    res.send({ status: "success", payload: "Email enviado con exito" });

  } catch (error) {
    handleError(res, error);
  }
    
}

const getToken = (email) => {
  const token = jwt.sign({ email }, KEY_JWT, {expiresIn: "1h"});
  return token
}

module.exports = passwordRecovery;