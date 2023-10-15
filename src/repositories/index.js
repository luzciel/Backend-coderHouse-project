const ProductRepository = require('./Product.repository');
const CartRepository = require('./Cart.repository.js');
const UserRepository = require('./User.repository.js');
const Product = require( '../dao/product.js' );
const Cart = require( '../dao/cart.js' );
const User = require( '../dao/user.js' );

const productService = new ProductRepository(new Product())

const cartServices = new CartRepository(new Cart())

const userServices = new UserRepository(new User())

module.exports = {
  productService, 
  cartServices,
  userServices
}
