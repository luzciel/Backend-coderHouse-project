const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsControllert");
const {authorization} = require("../middlewares/middlewares");
const passport = require("passport");
const authenticateJWT = passport.authenticate("jwt", { session: false });


router.get("/", productsController.getAllProducts);

router.get("/:pid", productsController.getOneProduct);

router.post("/", authenticateJWT, authorization("administrador"), productsController.createProduct);

router.delete("/:pid", authenticateJWT, authorization("administrador"),  productsController.deleteProduct);

router.put("/:pid", authenticateJWT, authorization("administrador"),  productsController.updateProduct);

module.exports = router;
