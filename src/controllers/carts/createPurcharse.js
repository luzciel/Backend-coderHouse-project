const handleError = require("../../util/handleError.js");
const { cartServices, productService, ticketServices } = require('../../repositories/index.js');
const {purchaseConfirmationEmail} = require("../../util/nodemailer.js");
const { textMessage } = require("../../util/textMessage.js");
const {generateUniqueTicketNumber} = require("../../util/generateTicketCode.js");

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

      const userData = JSON.parse(req.cookies.userData);
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
    return updateProductStock;
  });
}

const constructorTicket = ({emailUser, totalTicket}) => {
  return {
    amount : totalTicket,
    purchaser: emailUser,
    code: generateUniqueTicketNumber()
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

module.exports = createPurcharse
