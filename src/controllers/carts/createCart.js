const handleError = require("../../util/handleError.js");
const { cartServices, userServices} = require('../../repositories/index.js');

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

module.exports = createCart;