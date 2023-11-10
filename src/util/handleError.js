const handleError = (res, error) => {
  req.logger.error(error);
  res.status(500).send({ status: "Error", payload: "Ocurrió un error" });
};

module.exports = handleError;