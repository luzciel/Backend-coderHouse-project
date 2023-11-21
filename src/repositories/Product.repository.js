class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAllProducts = async () => {
    let result = await this.dao.getAllProduct();
    return result;
  }

  getOneProduct = async (id) => {
    let result = await this.dao.getOneProduct(id);
    return result;
  }

  createProduct = async (body) => {
    let result = await this.dao.createProduct(body);
    return result;
  }

  deleteOneProduct = async (id) => {
    let result = await this.dao.deleteOneProduct(id);
    return result;
  }

  updateProduct = async (id, body) => {
    let result = await this.dao.updateProduct(id, body);
    return result;
  }
  updateStock = async (id, newStock) => {
    let result = await this.dao.updateStock(id, newStock);
    return result;
  }
}

module.exports = ProductRepository;