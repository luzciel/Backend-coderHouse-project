const { cartServices, userServices, productService, ticketServices } = require('../repositories/index.js');
const crypto = require("node:crypto");
const {purchaseConfirmationEmail} = require("../util/nodemailer.js");
const handleError = require("../util/handleError.js");
const { textMessage } = require("../util/textMessage.js");

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
    const updateCart = await cartServices.addOneProduct(cartId, productId);

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

const createPurcharse = async (req, res) => {
  const emailUser = req.user.email;
  const idCart = String(req.params.cid);
  try {
    const cart = await cartServices.getCart(idCart);
    const productStatus = evaluateAvailability(cart)
    const availableProduct = productStatus.availableProduct;
    const soltOut = productStatus.soltOut;

    if(availableProduct.length > 0) {

      await updateStockInBD(availableProduct)
    
      const totalTicket = totalAvailableProduct(availableProduct);
    
      const updateCart = await deleteOrUpdateCart(idCart, soltOut); 
    
      const createTicket = await generateTicket({emailUser, totalTicket});
  
      purchaseConfirmationEmail({availableProduct, totalTicket, createTicket });

      const userData = JSON.parse(req.cookies.userData)
      const textMessageBody = `Estimad@ ${userData.first_name}, le informamos que su compra fue correctamente procesada bajo el número ${createTicket.code}.`;

      await textMessage({textMessageBody})

      return res.status(200).send({ status: "success", payload: {productStatus}});
    }

    res.status(200).send({ status: "success", payload: productStatus});
  } catch (error) {
    handleError(res, error);
  }
}

const totalAvailableProduct = (products) => {
  const total = products.reduce((accumulatedTotal, cartItem) => {
    const { product, quantity } = cartItem;
    const { price } = product;
    return accumulatedTotal + (price * quantity);
  }, 0);
  return total
}

const evaluateAvailability = (cart) => {
  const soltOut = [];
  const availableProduct = [];
  
  cart[0].products.forEach((product) => {
    let stock = Number(product.product.stock)
    let productQuantity = Number(product.quantity)

    if( stock >= productQuantity){
      availableProduct.push(product);

    } else {
      soltOut.push(product);
    }
  });
  return { availableProduct, soltOut};
}

const updateStockInBD = async (availableProduct) => {
  availableProduct.forEach(async (product)=> {
    let stock = Number(product.product.stock)
    let productQuantity = Number(product.quantity)
    let newStock = (stock - productQuantity)
    
    const updateProductStock = await productService.updateStock(product.product._id, newStock);
  });
}

const constructorTicket = ({emailUser, totalTicket}) => {
  return {
    amount : totalTicket,
    purchaser: emailUser,
    code: crypto.randomUUID()
  }
}

const generateTicket = async ({emailUser, totalTicket}) => {
  const ticket = constructorTicket({emailUser, totalTicket})
  
  const createTicketInDB = await ticketServices.createTicket(ticket)
  return createTicketInDB
}

const deleteOrUpdateCart = async (idCart, soltOut) => {

  if(soltOut.length === 0) {
    const deleteCart = await cartServices.deleteAllProduct(idCart);
    return deleteCart
  };

  const productsUpdate = soltOut.map((product) => {
    return {
      product: product.product._id,
      quantity: product.quantity
    }
  })

  const cart = await cartServices.getCartId(idCart);
  cart.products = productsUpdate;
  const updateCartWithListOfOutOfStock = await cartServices.updateCart(idCart, cart);

  return updateCartWithListOfOutOfStock
}

module.exports = {
  createCart,
  getCart,
  addOneProductToCart,
  deleteProductFromTheCart,
  updateCart,
  updateQuantityOfProductsInCart,
  deleteAllProductsFromCart,
  createPurcharse
}