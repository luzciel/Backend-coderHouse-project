const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsControllert");

router.get("/", productsController.getAllProducts);

router.get("/:pid", productsController.getOneProduct);

router.post("/", productsController.createProduct);

router.delete("/:pid", productsController.deleteProduct);

router.put("/:pid", productsController.updateProduct);

module.exports = router;
