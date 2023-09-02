const mongoose = require("mongoose");

const userCollection = "usuario";

const userScherma = new mongoose.Schema({
  nombre: { type: String, required: true, max: 100, index: true },
  email: { type: String, required: true },
});

const userModel = mongoose.model(userCollection, userScherma);

module.exports = { userModel };
