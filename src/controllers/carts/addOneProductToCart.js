const handleError = require("../../util/handleError.js");
const { cartServices, productService } = require('../../repositories/index.js')

const addOneProductToCart = async (req, res) => {
  const cartId = String(req.params.cid);
  const productId = String(req.params.pid);

  try {
    const product = await productService.getOneProduct(productId);

    if(product.owner === req.user.email && req.user.role === "premium") {
      res.status(403).send({ status: "error", payload: "forbidden" });
      return;
    }

    const updateCart = await cartServices.addOneProduct(cartId, productId);

    if (updateCart.modifiedCount === 0) {
      return res
        .status(404)
        .send({ status: "Error", payload: "Carrito o producto no encontrado" });
    }
    res.status(200).send({ status: "success", payload: "Producto agregado" });
  } catch (error) {
    handleError(res, error);
  }
}
module.exports = addOneProductToCart;