const { cartModel } = require("../dao/models/cart.model.js");
const { userModel } = require("../dao/models/user.modelo.js");


class Cart {
  constructor() {

  }

  newCart = async () => {
    try {
      const newCarts = await cartModel.create({});
      return newCarts;
    } catch (error) {
      console.error(error);
    }
  };

  getCartId = async (id) => {
    try {
      const cart = await cartModel.findById({ _id: id }).exec();
      return cart;
    } catch (error) {
      console.error(error);
    }
  };

  getCart = async (id) => {
    try {
      const cart = await cartModel.find({ _id: id });
      return cart;
    } catch (error) {
      console.error(error);
    }
  };

  addOneProduct = async (cartId, cart) => {
    try {
      let cart = await cartModel.updateOne({ _id: cartId}, cart);
      return cart;
    } catch (error) {
      console.error(error);
    }
  };

  deleteProduct = async (cartId, productId) => {
    try {
      const productDelete = await cartModel.updateOne(
        { _id: cartId },
        { $pull: { products: { product: productId } } }
      );
      return productDelete;
    } catch (error) {
      console.error(error);
    }
  };

  updateCart = async (cartId, cart) => {
    try {
      const filter = { _id: cartId };
      const updateCart = await cartModel.updateOne(filter, cart);
      return updateCart
    } catch (error) {
      console.error(error);
    }
  }

  updateQuantityOfProducts = async (cartId, productId, newQuantity) => {
    try {
      const findAndUpdateProduct = await cartModel.findOneAndUpdate(
        {
          _id: cartId,
          "products.product": productId,
        },
        { $set: { "products.$.quantity": newQuantity } },
        { new: true }
      );
      return findAndUpdateProduct
    } catch (error) {
      console.error(error);
      
    }
  }

  deleteAllProduct = async (id) => {
    try {
      const deleteProducts = await cartModel.findByIdAndUpdate(
        id,
        { $set: { products: [] } },
        { new: true }
      );
      return deleteProducts
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = Cart;
