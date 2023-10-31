const handleError = require("../../util/handleError.js");
const { cartServices} = require('../../repositories/index.js')

const deleteProductFromTheCart = async (req, res) => {
  const cartId = String(req.params.cid);
  const productId = String(req.params.pid);

  try {
    const productDelete = await cartServices.deleteProduct(cartId, productId);

    if (productDelete.modifiedCount === 0 || productDelete.matchedCount === 0) {
      res
        .status(404)
        .send({ status: "error", payload: "Carrito o producto no encontrado" });
    }

    res.status(200).send({ status: "success", payload: productDelete });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = deleteProductFromTheCart