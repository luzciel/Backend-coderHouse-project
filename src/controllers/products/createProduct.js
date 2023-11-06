const {productService} = require("../../repositories/index.js");
const handleError = require("../../util/handleError.js");
const CustomError = require("../../services/error/CustomError.js");
const {generateProductErrorInfo} = require("../../services/error/info.js");
const EErrors = require("../../services/error/enums.js");
const createProduct = async (req, res) => {
  try {
    const body = req.body;

    if (
      !body ||
      !body.title ||
      !body.description ||
      !body.price ||
      !body.code ||
      !body.stock ||
      !body.category
    ) {
      CustomError.createError({
        name: "Product creation error",
        cause: generateProductErrorInfo(body),
        message: "Error Trying to create product",
        code: EErrors.INVALID_TYPE_ERROR
      })
    } else {
      const saveProduct = await productService.createProduct(body);
      res.status(200).send([{ status: "success", payload: saveProduct }]);
    }
  } catch (error) {
    handleError(res, error);  }
};

module.exports = createProduct;