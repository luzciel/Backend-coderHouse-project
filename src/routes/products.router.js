const express = require("express");
const router = express.Router();
const {authorization} = require("../middlewares/middlewares");
const passport = require("passport");

const getAllProducts = require("../controllers/products/getAllProducts");
const getOneProduct = require("../controllers/products/getOneProduct");
const createProduct = require("../controllers/products/createProduct");
const deleteProduct = require("../controllers/products/deleteProduct");
const updateProduct = require("../controllers/products/updateProduct");

const authenticateJWT = passport.authenticate("jwt", { session: false });

router.get("/", getAllProducts);

router.get("/:pid", getOneProduct);

router.post("/", authenticateJWT, authorization("administrador", "premium"), createProduct);

router.delete("/:pid", authenticateJWT, authorization("administrador", "usuario"),  deleteProduct);

router.put("/:pid", authenticateJWT, authorization("administrador", "usuario"),  updateProduct);

module.exports = router;
