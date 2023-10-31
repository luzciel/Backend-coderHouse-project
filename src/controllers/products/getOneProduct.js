const handleError = require("../../util/handleError.js");
const {productService} = require("../../repositories/index.js");
const getOneProduct = async (req, res) => {
  try {
    const id = String(req.params.pid);
    const product = await productService.getOneProduct(id)
   
    if (product === null) {
      res.status(404).send([
        {
          status: "error",
          error: "No se encontro el producto con el id:" + id,
        },
      ]);
    } else {
      res.status(200).send({ status: "success", payload: product });
    }

  } catch (error) {
    handleError(res, error);  }
};

module.exports = getOneProduct;