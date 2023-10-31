const handleError = require("../../util/handleError.js");
const { cartServices } = require('../../repositories/index.js')

const updateQuantityOfProducts = async (req, res) => {
  const newQuantity = Number(req.body.quantity);
  const cartId = String(req.params.cid);
  const productId = String(req.params.pid);

  try {
    const findAndUpdateProduct = await cartServices.updateQuantityOfProductsInCart(cartId, productId, newQuantity)
    if (!findAndUpdateProduct) {
      return res
        .status(404)
        .send({ status: "Error", payload: "Carrito o producto no encontrado" });
    }

    res.status(200).send({ status: "success", payload: findAndUpdateProduct });
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = updateQuantityOfProducts