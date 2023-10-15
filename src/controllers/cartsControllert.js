const { userModel } = require("../dao/models/user.modelo.js");
const { cartServices, userServices } = require('../repositories/index.js');
const handleError = require("../util/handleError.js");

const createCart = async (req, res) => {
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
    const newCarts = await cartServices.newCart();
    await userServices.updateUser(email , newCarts);

    res.cookie("cart", newCarts._id, { maxAge: 3600000 });

    res.status(201).send({ status: "success", payload: newCarts });
  } catch (error) {
    handleError(res, error);
  }
};

const getCart = async (req, res) => {
  const id = String(req.params.cid);
  try {
    const cart = await cartServices.getCart(id);

    if (cart.length === 0) {
      const notFoundInBd = responseNotFound(id);
      res.status(404).send(notFoundInBd);
    } else {
      res.status(200).send({ status: "success", payload: cart });
    }
  } catch (error) {
    handleError(res, error);
  }
};

const addOneProductToCart = async (req, res) => {
  const cartId = String(req.params.cid);
  const productId = String(req.params.pid);

  try {

    let cart = await cartServices.getCartId(cartId);

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

    const updateCart = await cartServices.updateCart(cartId, cart);

    res.status(200).send({ status: "success", payload: updateCart });
  } catch (error) {
    handleError(res, error);
  }
}

const deleteProductFromTheCart = async (req, res) => {
  const cartId = String(req.params.cid);
  const productId = String(req.params.pid);

  try {
    const productDelete = await cartServices.deleteProduct(cartId, productId);

    if (productDelete.modifiedCount === 0 || productDelete.matchedCount === 0) {
      res
        .status(404)
        .send({ status: "error", payload: "Carrito o producto no encontrado" });
    }

    res.status(200).send({ status: "success", payload: productDelete });
  } catch (error) {
    handleError(res, error);
  }
};

const updateCart = async (req, res) => {
  const cartId = String(req.params.cid);
  const productsUpdate = req.body.products;

  try {
    const cart = await cartServices.getCartId(cartId);

    if (!cart) {
      const notFoundInBd = responseNotFound(cartId);
      return res.status(404).send(notFoundInBd);
    }

    cart.products = productsUpdate;
    const updateCart = await cartServices.updateCart(cartId, cart);

    res.status(200).send({ status: "success", payload: updateCart });
  } catch (error) {
    handleError(res, error);
  }
};

const updateQuantityOfProductsInCart = async (req, res) => {
  const newQuantity = Number(req.body.quantity);
  const cartId = String(req.params.cid);
  const productId = String(req.params.pid);

  try {
    const findAndUpdateProduct = await cartServices.updateQuantityOfProductsInCart(cartId, productId, newQuantity)
    if (!findAndUpdateProduct) {
      return res
        .status(404)
        .send({ status: "Error", payload: "Carrito o producto no encontrado" });
    }

    res.status(200).send({ status: "success", payload: findAndUpdateProduct });
  } catch (error) {
    handleError(res, error);
  }
}

const deleteAllProductsFromCart = async (req, res) => {
  const id = String(req.params.cid);
  try {
    const deleteProducts = await cartServices.deleteAllProduct(id);

    if (!deleteProducts) {
      const notFoundInBd = responseNotFound(id);
      return res.status(404).send(notFoundInBd);
    }

    res.status(200).send({ status: "success", payload: deleteProducts });
  } catch (error) {
    handleError(res, error);
  }
}

const responseNotFound = (id) => {
  const response = {
    status: "Error",
    payload: "No se encontro el carrito con el id:" + id,
  };
  return response;
};

module.exports = {
  createCart,
  getCart,
  addOneProductToCart,
  deleteProductFromTheCart,
  updateCart,
  updateQuantityOfProductsInCart,
  deleteAllProductsFromCart
}