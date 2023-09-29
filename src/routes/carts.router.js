const express = require("express");
const router = express.Router();
const { cartModel } = require("../models/cart.model.js");
const { userModel } = require("../models/user.modelo.js");
const handleError = require("../util/handleError.js");
const jwt = require("jsonwebtoken");
const passport = require("passport");
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  //crea un nuevo carrito
  const email = req.user.email;
  try {
    const body = req.body;
    if (req.cookies.cart) {
      return res
        .status(200)
        .send({
          status: "success",
          payload: { _id: req.cookies.cart, message: "El carrito ya existe" },
        });
    }
    const newCarts = await cartModel.create(body);
    const update = { $set: { cart: newCarts._id } };
    await userModel.updateOne({ email } , update);

    res.cookie("cart", newCarts._id, { maxAge: 3600000 });

    res.status(201).send({ status: "success", payload: newCarts });
  } catch (error) {
    handleError(res, error);
  }
});

router.get("/:cid", async (req, res) => {
  // deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados
  const id = String(req.params.cid);
  try {
    const cart = await cartModel.find({ _id: id });

    if (cart.length === 0) {
      const notFoundInBd = responseNotFound(id);
      res.status(404).send(notFoundInBd);
    } else {
      res.status(200).send({ status: "success", payload: cart });
    }
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  //debe agregar un producto al carrito
  const cartId = String(req.params.cid);
  const productId = String(req.params.pid);

  try {
    const filter = { _id: cartId };

    let cart = await cartModel.findById(filter).exec();

    if (!cart) {
      const notFoundInBd = responseNotFound(id);
      res.status(404).send(notFoundInBd);
    }

    const hasProduct = cart.products.find((product) => {
      return product.product.toString() == productId.toString();
    });

    if (!hasProduct) {
      const updateData = { product: productId, quantity: 1 };
      cart.products.push(updateData);
    } else {
      hasProduct.quantity += 1;
    }

    const updateCart = await cartModel.updateOne(filter, cart);

    res.status(200).send({ status: "success", payload: updateCart });
  } catch (error) {
    handleError(res, error);
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  //deberá eliminar del carrito el producto seleccionado.
  const cartId = String(req.params.cid);
  const productId = String(req.params.pid);

  try {
    const productDelete = await cartModel.updateOne(
      { _id: cartId },
      { $pull: { products: { product: productId } } }
    );

    if (productDelete.modifiedCount === 0 || productDelete.matchedCount === 0) {
      res
        .status(404)
        .send({ status: "error", payload: "Carrito o producto no encontrado" });
    }

    res.status(200).send({ status: "success", payload: productDelete });
  } catch (error) {
    handleError(res, error);
  }
});

router.put("/:cid", async (req, res) => {
  // deberá actualizar el carrito con un arreglo de productos
  const cartId = String(req.params.cid);
  const productsUpdate = req.body.products;
  const idCart = { _id: cartId };

  try {
    const cart = await cartModel.findById(idCart).exec();

    if (!cart) {
      const notFoundInBd = responseNotFound(cartId);
      return res.status(404).send(notFoundInBd);
    }

    cart.products = productsUpdate;
    const updateCart = await cartModel.updateOne(idCart, cart);

    res.status(200).send({ status: "success", payload: updateCart });
  } catch (error) {
    handleError(res, error);
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  //Actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde el body
  const newQuantity = Number(req.body.quantity);
  const cartId = String(req.params.cid);
  const productId = String(req.params.pid);

  try {
    const findAndUpdateProduct = await cartModel.findOneAndUpdate(
      {
        _id: cartId,
        "products.product": productId,
      },
      { $set: { "products.$.quantity": newQuantity } },
      { new: true }
    );
    if (!findAndUpdateProduct) {
      return res
        .status(404)
        .send({ status: "Error", payload: "Carrito o producto no encontrado" });
    }

    res.status(200).send({ status: "success", payload: findAndUpdateProduct });
  } catch (error) {
    handleError(res, error);
  }
});

router.delete("/:cid", async (req, res) => {
  //eliminar todos los productos del carrito
  const id = String(req.params.cid);
  try {
    const deleteProducts = await cartModel.findByIdAndUpdate(
      id,
      { $set: { products: [] } },
      { new: true }
    );

    if (!deleteProducts) {
      const notFoundInBd = responseNotFound(id);
      return res.status(404).send(notFoundInBd);
    }

    res.status(200).send({ status: "success", payload: deleteProducts });
  } catch (error) {
    handleError(res, error);
  }
});

const responseNotFound = (id) => {
  const response = {
    status: "Error",
    payload: "No se encontro el carrito con el id:" + id,
  };
  return response;
};

module.exports = router;
