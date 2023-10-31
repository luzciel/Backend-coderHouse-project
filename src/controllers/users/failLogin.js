const failLogin = async (req, res) => {
  res.status(400).send({ status: "error", error: "Ocurrio un error" });
}

module.exports = failLogin