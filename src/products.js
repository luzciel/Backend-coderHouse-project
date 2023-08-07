const { copyFileSync } = require('fs');

const fs = require('fs').promises;

class Products {
  constructor(fileProducts) {
    this.fileProducts = fileProducts;
  }
  async createFile() {
    try {
        const data = [];
        await fs.writeFile(this.fileProducts, JSON.stringify(data));
    } catch (error) {
        throw new Error("error al crear archivo")

    }
}
  async save(product) {
    try{
        const products = await this.getAll();
        const id = products.length ? products[products.length - 1].id + 1 : 1;
        const newProduct = {
            id,
            ...product
        } 
        products.push(newProduct);
        await this.saveNewProduct(products);
        return id;
    }catch(error){
        throw new Error("Error al guardar el producto");
    }
}

async getById(id) {
    try{
        const data = await this.getAll();
        const product = data.find(product => product.id === id);
        const response = product ? [product] : [ {error: `No se encontro el producto con el id ${id}`} ];
        return response;
    }catch(error){
        throw new Error("Error al buscar el producto por ID:", id);
    }
}

async getAll() {
    try {
        const products = await fs.readFile(this.fileProducts, 'utf-8');
        return JSON.parse(products);
    } catch (error) {
        return [];
    }
}

async editById(id, updateProduct) {
    try{
        const data = await this.getAll();
        const idValidate = data.find(product => product.id === id);
        
        if(!idValidate) {
            return [ {error: `No se encontro el producto con el id ${id}`} ];
        } 
        const editProducts = data.map(product => {
          if( product.id === id) {
            return {
              id: product.id,
            ...updateProduct
            }
          }
          return product
        })
        await fs.writeFile(this.fileProducts, JSON.stringify(editProducts));
        return [{ message: `Producto con id ${id} se actualizo con exito` }];
    }catch(error){
        throw new Error("Error al editar el producto");
    }
}
async deleteById(id) {
    try{
        const data = await this.getAll();
        const products = data.filter(product => product.id !== id);
        if(data.length === products.length){
            return [ {error: `No se encontro el producto con el id ${id}`} ];
        }

        await fs.writeFile(this.fileProducts, JSON.stringify(products));
        return [{ message: `Producto con id ${id} se elimino con exito` }];
    }catch(error){
        throw new Error("Error al borrar el producto");
    }
}

async saveNewProduct(product) {
    try{
        await fs.writeFile(this.fileProducts, JSON.stringify(product));
    }catch(error){
        throw new Error("Error al guardar el producto");
    }

}
}

module.exports = Products