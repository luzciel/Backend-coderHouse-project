const { productService } = require("../../repositories/index.js");
const {isValidObjectId} = require("../../util/validObjectId.js");
const handleError = require("../../util/handleError.js");

const deleteProduct = async (req, res) => {
  const id = String(req.params.pid); 
   try {
     if (!isValidObjectId(id)) {
       res.status(400).send({ status: "error", payload: "ID no válido" });
       return;
     } else {
        const product = await productService.getOneProduct(id)

        if(product.owner !== req.user.email && req.user.role !== "administrador") {
          res.status(403).send({ status: "error", payload: "forbidden" });
          return;
        }

        const deleteProduct = await productService.deleteOneProduct(id);
 
       if (deleteProduct.deletedCount === 0) {
         res.status(404).send([
           {
             status: "error",
             error: "No se encontro el producto con el id:" + id,
           },
         ]);
         return;
       } else {
         res.status(200).send({ status: "success", payload: "Producto eliminado" });
       }
     }
   } catch (error) {
     handleError(res, error);
   }
 };
 
 module.exports = deleteProduct;