const handleError = require("../../util/handleError.js");
const { cartServices } = require('../../repositories/index.js')

const addOneProductToCart = async (req, res) => {
  const cartId = String(req.params.cid);
  const productId = String(req.params.pid);
  try {
    const updateCart = await cartServices.addOneProduct(cartId, productId);

    res.status(200).send({ status: "success", payload: updateCart });
  } catch (error) {
    handleError(res, error);
  }
}
module.exports = addOneProductToCart;