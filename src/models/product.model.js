const mongoose = require('mongoose');

const productColleccion = "products";

const productSchema = new mongoose.Schema({
  nombre : { type: String, required: true, index: true },
  categoria : { type: String, required: true, index: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  imagen: { type: String, required: true }
})

const productModel = mongoose.model(productColleccion, productSchema);

module.exports = {productModel}