const express = require("express");
const router = express.Router();
const passport = require("passport");
const { authorization } = require("../middlewares/middlewares.js");
const getCart = require("../controllers/carts/getCart.js");
const createCart = require("../controllers/carts/createCart.js");
const addOneProductToCart = require("../controllers/carts/addOneProductToCart.js");
const deleteProduct = require("../controllers/carts/deleteProduct.js");
const updateCart = require("../controllers/carts/updateCart.js");
const updateQuantityOfProducts = require("../controllers/carts/updateQuantityOfProducts.js");
const deleteAllProductsFromCart = require("../controllers/carts/deleteAllProducts.js");
const createPurcharse = require("../controllers/carts/createPurcharse.js");

const authenticateJWT = passport.authenticate("jwt", { session: false });

router.post("/", authenticateJWT, createCart);

//Lista los productos que pertenezcan al carrito con el parámetro cid proporcionados
router.get("/:cid", getCart);

//agrega un producto al carrito
router.post("/:cid/product/:pid", authenticateJWT, authorization("usuario", "premium"), addOneProductToCart);

//elimina del carrito el producto seleccionado
router.delete("/:cid/product/:pid", deleteProduct);

//actualiza el carrito con un arreglo de productos
router.put("/:cid", updateCart);

//Actualiza SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde el body
router.put("/:cid/product/:pid", updateQuantityOfProducts);

//elimina todos los productos del carrito
router.delete("/:cid", deleteAllProductsFromCart);

router.post("/:cid/purchase", authenticateJWT,createPurcharse);

module.exports = router;
