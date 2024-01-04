const { productService, userServices } = require("../../repositories/index.js");
const { isValidObjectId } = require("../../util/validObjectId.js");
const handleError = require("../../util/handleError.js");
const { productDeletionEmail } = require("../../util/nodemailer.js");
const deleteProduct = async (req, res) => {
  const id = String(req.params.pid);
  try {
    if (!isValidObjectId(id)) {
      res.status(400).send({ status: "error", payload: "ID no válido" });
      return;
    }

    const product = await productService.getOneProduct(id);

    if (!product) {
      res.status(404).send([
        {
          status: "error",
          error: "No se encontro el producto con el id:" + id,
        },
      ]);
      return;
    }

    if (product.owner !== req.user.email && req.user.role !== "administrador") {
      res.status(403).send({ status: "error", payload: "forbidden" });
      return;
    }

    const deleteProduct = await productService.deleteOneProduct(id);
    const user = await userServices.getUser(deleteProduct.owner);

    if (deleteProduct.owner && user?.role === "premium") {
      productDeletionEmail({
        email: deleteProduct.owner,
        productName: deleteProduct.title,
        code: deleteProduct.code,
      });
    }

    res.status(200).send({ status: "success", payload: "Producto eliminado" });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = deleteProduct;
