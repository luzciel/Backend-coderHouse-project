const { Router } = require("express");
const passport = require("passport");
const getProducts = require("../controllers/viewsProducts/getProducts");
const getOneProduct = require("../controllers/viewsProducts/getOneProduct");

const router = Router();
const authenticateJWT = passport.authenticate("jwt", { session: false });

router.get("/", authenticateJWT, getProducts);

router.get("/:pid", authenticateJWT, getOneProduct);

module.exports = router;
