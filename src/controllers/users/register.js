const register = async (req, res) => {
  try {
    res.send({ status: "success", payload: "Usuario registrado con éxito" });
  } catch (error) {
    req.logger.error(error);
  }
}
module.exports = register