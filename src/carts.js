const fs = require('fs').promises;

class Carts {
  constructor(fileCarts) {
    this.fileCarts = fileCarts;
  }
  async createFile() {
    try {
        const data = [];
        await fs.writeFile(this.fileCarts, JSON.stringify(data));
    } catch (error) {
        throw new Error("error al crear archivo")

    }
}
  async save() {
    try{
        const carts = await this.getAll();
        const id = carts.length ? carts[carts.length - 1].id + 1 : 1;
        const newProduct = {
            id,
            products: []
        } 

        carts.push(newProduct);  
        await this.saveNewCart(carts);

        return [{ message: `El carrito con id ${id} se creo con exito` }];
    }catch(error){
        throw new Error("Error al guardar el carrito");
    }
}

async getById(id) {
    try{
        const data = await this.getAll();
        const cart = data.find(cart => cart.id === id);
        const response = cart ? [cart] : [ {error: `No se encontro el producto con el id ${id}`} ];
        
        return response;
    }catch(error){
        throw new Error("Error al buscar el producto por ID:", id);
    }
}

async getAll() {
    try {
        const products = await fs.readFile(this.fileCarts, 'utf-8');
        return JSON.parse(products);
    } catch (error) {
        return [];
    }
}

async addProduct(cartId, productId ) {
    try{
        const carts = await this.getAll();
        const cartIndex = carts.findIndex((cart) => cart.id === cartId);

        if (cartIndex === -1) {
            return [ { error: 'Carrito no encontrado.' }];
        }

        const productIndex = carts[cartIndex].products.findIndex((product) => product.product === productId);

        if (productIndex === 0) {
          const newQuantity = carts[cartIndex].products[productIndex].quantity + 1
          carts[cartIndex].products[productIndex].quantity = newQuantity
          
        } else {
          const newProduct = {
            product: productId,
            quantity: 1,
          }
          carts[cartIndex].products.push(newProduct);
        }

        await fs.writeFile(this.fileCarts, JSON.stringify(carts));
        return [{ message: `El carrito con id ${cartId} se actualizo con exito` }];

    }catch(error){
        throw new Error("Error al editar el producto");
    }
}

async saveNewCart(product) {
    try{
        await fs.writeFile(this.fileCarts, JSON.stringify(product));
    }catch(error){
        throw new Error("Error al guardar el producto");
    }

}
}

module.exports = Carts