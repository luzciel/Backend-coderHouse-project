const handleError = require("../../util/handleError.js");
const CustomError = require("../../services/error/CustomError.js");
const {generateProductErrorInfo} = require("../../services/error/info.js");
const {productService} = require("../../repositories/index.js");
const EErrors = require("../../services/error/enums.js");
const {isValidObjectId} = require("../../util/validObjectId.js");

const updateProduct = async (req, res) => {
  const id = String(req.params.pid);
  const body = req.body;

  try {
    if (
      !body ||
      !body.title ||
      !body.description ||
      !body.price ||
      !body.code ||
      !body.stock ||
      !body.category ||
      !body.thumbnail ||
      !id
    ) {
      CustomError.createError({
        name: "Product update error",
        cause: generateProductErrorInfo(body),
        message: "Error Trying to update product",
        code: EErrors.INVALID_TYPE_ERROR
      })

    } else if (!isValidObjectId(id)) {
      res.status(400).send({ status: "error", payload: "ID no válido" });
      return;
    }
    const product = await productService.getOneProduct(id)

    if(product.owner !== req.user.email && req.user.role !== "administrador") {
      res.status(403).send({ status: "error", payload: "forbidden" });
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
      return;
    } else {
      res.status(200).send({ status: "success", payload: updateProduct });
    }
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = updateProduct