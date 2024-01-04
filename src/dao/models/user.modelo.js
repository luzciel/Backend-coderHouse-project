const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true, index: true },
  last_name: { type: String },
  email: { type: String, required: true, index: true },
  age: { type: Number },
  password: { type: String },
  role: {
    type: String,
    enum: ["usuario", "administrador", "premium"],
    default: "usuario",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  documents: {
    type: [
      {
        name: { type: String, required:true },
        reference: { type: String, required:true },
      },
    ],
    default: [],
  },
  last_connection: { type: Date, default: Date.now},
});

userSchema.pre("find", function () {
  this.populate("cart");
})

const userModel = mongoose.model("Usuario", userSchema);

module.exports = { userModel };
