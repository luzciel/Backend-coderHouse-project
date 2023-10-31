const {productService} = require("../../repositories/index.js");
const handleError = require("../../util/handleError.js");
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
      res.status(400).send({
        error:
          "Debe proporcionar todos los campos (title, price, description, code, stock, category).",
      });
    } else {
      const saveProduct = await productService.createProduct(body);
      res.status(200).send([{ status: "success", payload: saveProduct }]);
    }
  } catch (error) {
    handleError(res, error);  }
};

module.exports = createProduct;