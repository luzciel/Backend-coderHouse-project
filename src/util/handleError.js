const handleError = (res, error) => {
  console.error(error);
  res.status(500).send({ status: "Error", payload: "Ocurrió un error" });
};

module.exports = handleError;