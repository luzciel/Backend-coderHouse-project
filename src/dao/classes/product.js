const { productModel } = require("../models/product.model");
const ProductDTO = require("../DTOs/product.dto.js");

class Product {
  constructor() {}

  getAllProduct = async (query, options) => {
    try {
      const allproducts = await productModel.paginate(query, options);
      return allproducts;
    } catch (error) {
      console.error(error);
    }
  };

  getOneProduct = async (id) => {
    try {
      const product = await productModel.findById({ _id: id }).exec();
      return product;
    } catch (error) {
      console.error(error);
    }
  };

  createProduct = async (body) => {
    try {
      const bodyProduct = new ProductDTO(body);
      const saveProduct = await productModel.create(bodyProduct);
      return saveProduct;
    } catch (error) {
      console.error(error);
    }
  };

  deleteOneProduct = async (id) => {
    try {
      const deleteProduct = await productModel.deleteOne({ _id: id });
      return deleteProduct;
    } catch (error) {
      console.error(error);
    }
  };

  updateProduct = async (id, body) => {
    try {
      const bodyProduct = new ProductDTO(body);
      const updateProduct = await productModel.updateOne(
        { _id: id },
        bodyProduct
      );
      return updateProduct;
    } catch (error) {
      console.error(error);
    }
  };

  updateStock = async (id, newQuantity) => {
    try {
      const updateStock = await productModel.updateOne(
        { _id: id },
        { stock: newQuantity }
      );
      return updateStock;
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = Product;
