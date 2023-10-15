const { Router } = require("express");
const router = Router();
const passport = require("passport");
const viewsProductsController = require ('../controllers/viewsProductsControllert.js');

router.get("/", passport.authenticate("jwt", { session: false }), viewsProductsController.getProducts);

router.get("/:pid", viewsProductsController.getOneProduct);

module.exports = router;
