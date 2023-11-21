const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const productColleccion = "products";

const productSchema = new mongoose.Schema({
  title : { type: String, required: true, index: true },
  description : { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true, index: true},
  owner: {type:String, required: true},
  thumbnails: { type: Array, default: [] }
})

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productColleccion, productSchema);

module.exports = {productModel}