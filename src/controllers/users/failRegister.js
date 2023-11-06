const CustomError = require("../../services/error/CustomError.js");
const handleError = require("../../util/handleError.js");
const {generateUserErrorInfo} = require("../../services/error/info.js");
const EErrors = require("../../services/error/enums.js");
const failRegister = async (req, res) => {
 try{
  const { first_name, last_name, age, email } = req.body;
  
  if (!first_name || !last_name || !email || !age || !password) {
    CustomError.createError({
      name: "User creation error",
      cause: generateUserErrorInfo({ first_name, last_name, age, email}),
      message: "Error Trying to create user",
      code: EErrors.INVALID_TYPE_ERROR
    })
  }

  res.status(400).send({ status: "error", error: "Ocurrio un error" });
} catch (error) {
  handleError(res, error);
}
}

module.exports = failRegister;