const responseNotFound = (id) => {
  const response = {
    status: "Error",
    payload: "No se encontro el carrito con el id:" + id,
  };
  return response;
};

module.exports = responseNotFound