class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  newCart = async () => {
    const newCarts = await this.dao.newCart();
    return newCarts;
  };

  getCart = async (id) => {
    const cart = await this.dao.getCart(id);
    return cart;
  };
  
  getCartId = async (id) => {
    const cart = await this.dao.getCartId(id);
    return cart;
  };

  addOneProduct = async (cartId) => {
    const cart = await this.dao.addOneProduct(cartId);
    return cart;
  };

  deleteProduct = async (cartId, productId) => {
    const productDelete = await this.dao.deleteProduct(cartId, productId);
    return productDelete;
  };

  updateCart = async (idCart, cart) => {
    const updateCart = await this.dao.updateCart(idCart, cart);
    return updateCart;
  };

  updateQuantityOfProductsInCart = async (cartId, productId, newQuantity) => {
    const findAndUpdateProduct = await this.dao.updateQuantityOfProducts(
      cartId,
      productId,
      newQuantity
    );
    return findAndUpdateProduct;
  };

  deleteAllProduct = async (id) => {
    const deleteAllProduct = await this.dao.deleteAllProduct(id);
    return deleteAllProduct;
  };
}

module.exports = CartRepository;
