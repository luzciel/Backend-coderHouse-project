const handleError = require("../../util/handleError.js");
const { cartServices} = require('../../repositories/index.js')
const responseNotFound = require('./util/cart.util.js');
const deleteAllProductsFromCart = async (req, res) => {
  const id = String(req.params.cid);
  try {
    const deleteProducts = await cartServices.deleteAllProduct(id);

    if (!deleteProducts) {
      const notFoundInBd = responseNotFound(id);
      return res.status(404).send(notFoundInBd);
    }

    res.status(200).send({ status: "success", payload: deleteProducts });
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = deleteAllProductsFromCart