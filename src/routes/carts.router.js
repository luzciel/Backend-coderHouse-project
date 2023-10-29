const express = require("express");
const router = express.Router();
const cartsControllert = require("../controllers/cartsControllert.js");
const { authorization } = require("../middlewares/middlewares.js");
const passport = require("passport");
const authenticateJWT = passport.authenticate("jwt", { session: false });
router.post("/", authenticateJWT, cartsControllert.createCart);

//Lista los productos que pertenezcan al carrito con el parámetro cid proporcionados
router.get("/:cid", cartsControllert.getCart);

//agrega un producto al carrito
router.post("/:cid/product/:pid", authenticateJWT, authorization("usuario"), cartsControllert.addOneProductToCart);

//elimina del carrito el producto seleccionado
router.delete("/:cid/product/:pid", cartsControllert.deleteProductFromTheCart);

//actualiza el carrito con un arreglo de productos
router.put("/:cid", cartsControllert.updateCart);

//Actualiza SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde el body
router.put("/:cid/product/:pid", cartsControllert.updateQuantityOfProductsInCart);

//elimina todos los productos del carrito
router.delete("/:cid", cartsControllert.deleteAllProductsFromCart);

router.get("/:cid/purchase", authenticateJWT, cartsControllert.createPurcharse);

module.exports = router;
