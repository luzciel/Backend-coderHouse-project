const handleError = require("../../util/handleError.js");
const { cartServices} = require('../../repositories/index.js')
const responseNotFound = require('./util/cart.util.js');

const updateCart = async (req, res) => {
  const cartId = String(req.params.cid);
  const productsUpdate = req.body.products;

  try {
    const cart = await cartServices.getCartId(cartId);

    if (!cart) {
      const notFoundInBd = responseNotFound(cartId);
      return res.status(404).send(notFoundInBd);
    }

    cart.products = productsUpdate;
    const updateCart = await cartServices.updateCart(cartId, cart);

    res.status(200).send({ status: "success", payload: updateCart });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = updateCart