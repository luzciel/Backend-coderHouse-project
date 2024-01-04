const handleError = require("../../util/handleError.js");
const { cartServices} = require('../../repositories/index.js')
const responseNotFound = require('./util/cart.util.js');

const getCart = async (req, res) => {

  const id = String(req.params.cid);
  try {
    const cart = await cartServices.getCart(id);

    if (cart.length === 0) {
      const notFoundInBd = responseNotFound(id);
      res.status(404).send(notFoundInBd);
    } else {
      res.status(200).send({ status: "success", payload: cart });
    }
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = getCart;