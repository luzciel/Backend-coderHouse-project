const ProductRepository = require('./Product.repository');
const CartRepository = require('./Cart.repository.js');
const UserRepository = require('./User.repository.js');
const TicketRepository = require('./Ticket.repository.js');
const Product = require( '../dao/classes/product.js' );
const Cart = require( '../dao/classes/cart.js' );
const User = require( '../dao/classes/user.js' );
const Ticket = require( '../dao/classes/ticket.js' );

const productService = new ProductRepository(new Product())

const cartServices = new CartRepository(new Cart())

const userServices = new UserRepository(new User())

const ticketServices = new TicketRepository(new Ticket())

module.exports = {
  productService, 
  cartServices,
  userServices,
  ticketServices
}
