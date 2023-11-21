const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');
const {userServices} = require("../../repositories/index.js");
const { createHash, isValidatePassword } = require("../../util/hashPassword.js");
const handleError = require('../../util/handleError.js');

const KEY_JWT = config.KEY_JWT;

const restorePassword = async (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.password;
  const hashedPassword = createHash(newPassword)

  if(!token) {
    res.status(400).send({ status: "error", payload: "Faltan datos" });
  }

  const {email, exp } = decodeToken(token)

  if(exp > Date.now()) {
    res.status(401).send({ status: "error", payload: "Token expirado" });
  }
  
  try {
    const user = await userServices.getUser(email);

    if(!user) {
      res.status(400).send({ status: "error", payload: "Usuario no encontrado" });
    }
    
    if(isValidatePassword(user, newPassword )) {
      res.status(400).send({ status: "error", payload: "Contraseña dublicada" });
      return;
    }
  
  const updatePassword = await userServices.updatePassword(email, hashedPassword);

  if (updatePassword.modifiedCount === 0) {
    res.status(404).send([
      {
        status: "error",
        error: {
        message: "No se pudo cambiar la contraseña"
      }
      },
    ]);
    return;
  } else { 
    res.status(200).send({ status: "success", payload: "Contraseña restablecida" });
}
  
  } catch (error) {
    handleError(res, error);
  }
  

}


const decodeToken = (token) => {
  const decoded = jwt.verify(token, KEY_JWT);

  if (!decoded) {
    return null;
  }

  return decoded;
}
module.exports = restorePassword