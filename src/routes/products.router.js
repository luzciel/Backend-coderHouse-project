const express = require('express');
const router = express.Router();
const Products = require('../products.js');
const FILE_PRODUCTS = './src/data/dataProducts.json';

router.get("/api/products", async (req,res) => {
  try{
    const products = new Products(FILE_PRODUCTS);
    const limit = Number(req.query.limit);
    const allproducts = await products.getAll();

    if(limit && limit > 0){
      const productLimited = allproducts.slice(0,limit);
      res.status(200).send([productLimited]);
    } else if (limit === 0 || limit < 0){
      res.status(400).send([{error: "El limite debe ser mayor a cero"}]);
    } else {
      res.status(200).send(allproducts);
    }

  }catch(error){
    res.status(500).send([{ error: "Ocurrio un error"}])  
  }
});

router.get("/api/products/:pid", async (req,res) => {
  try{
    const id = Number(req.params.pid);
    const products = new Products(FILE_PRODUCTS);
    const allproducts = await products.getById(id);

    if(allproducts[0].error) {
      res.status(404).send(allproducts);
    } else {
      res.status(200).send(allproducts);
    }

  }catch(error){
    res.status(500).send([{ error: "Ocurrio un error"}]);
  }
});
router.post("/api/products", async (req,res) => {
  try{
    const body = req.body;
    const products = new Products(FILE_PRODUCTS);
    const saveProduct = await products.save(body)

    if(!body ||!body.title || !body.descripcion || !body.price || !body.price || !body.stock || !body.category || !body.thumbnail){
      res.status(400).send({error: "Debe proporcionar todos los campos (id, name, price, description, code, stock, category, thumbnail)."})
    } else {
      res.status(200).send([{id: saveProduct}]);
    }
  }catch(error){
    res.status(500).send([{error: "Ocurrio un error"}]);  
  }
})

router.delete("/api/products/:pid", async (req,res) => {
  try{
    const id = Number(req.params.pid);

    const products = new Products(FILE_PRODUCTS);
    const deleteProduct = await products.deleteById(id);

    if(deleteProduct[0].error) {
      res.status(404).send(deleteProduct);
    } else{
      res.status(200).send(deleteProduct);
    }
  }catch(error){
    res.status(500).send([{error: "Ocurrio un error"}]);  
  }
})

router.put("/api/products/:pid", async (req,res) => {
  try{
    const id = Number(req.params.pid);
    const body = req.body;
    const products = new Products(FILE_PRODUCTS);
    const updateProduct = await products.editById(id, body);

    if(!body ||!body.title || !body.descripcion || !body.price || !body.price || !body.stock || !body.category || !body.thumbnail){
      res.status(400).send({error: "Debe proporcionar todos los campos (id, name, price, description, code, stock, category, thumbnail)."})
     } else if (updateProduct[0].error) {
      res.status(404).send(updateProduct);
    } else{
      res.status(200).send(updateProduct);
    }
  }catch(error){
    res.status(500).send([{error: "Ocurrio un error"}]);  
  }
})

module.exports = router;