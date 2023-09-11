const mongoose = require("mongoose");

const cartColleccion = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {type: Number, required: true},
      },
    ],
    default: [],
  },
});

cartSchema.pre("find", function () {
  this.populate("products.product");
})

const cartModel = mongoose.model(cartColleccion, cartSchema);

module.exports = { cartModel };
