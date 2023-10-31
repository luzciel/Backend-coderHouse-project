const handleError = require("../../util/handleError.js");
const {productService} = require("../../repositories/index.js");

const updateProduct = async (req, res) => {
  try {
    const id = String(req.params.pid);
    const body = req.body;

    if (
      !body ||
      !body.title ||
      !body.descripcion ||
      !body.price ||
      !body.code ||
      !body.stock ||
      !body.category ||
      !body.thumbnail ||
      !id
    ) {
      res.status(400).send({
        status: "error",
        error:
          "Debe proporcionar todos los campos (id, title, price, description, code, stock, category, thumbnail).",
      });
      return;
    } else if (!isValidObjectId(id)) {
      res.status(400).send({ status: "error", payload: "ID no válido" });
      return;
    }

    const updateProduct = await productService.updateProduct(id, body);

    if (updateProduct.matchedCount === 0) {
      res.status(404).send([
        {
          status: "error",
          error: "No se encontro el producto con el id:" + id,
        },
      ]);
    } else {
      res.status(200).send({ status: "success", payload: updateProduct });
    }
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = updateProduct