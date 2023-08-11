const express = require('express');
const router = express.Router();
const Products = require('../products.js');
const FILE_PRODUCTS = './src/data/dataProducts.json';
const PRODUCTS = new Products(FILE_PRODUCTS);


router.get("/", async (req,res) => {
  try{
    const limit = Number(req.query.limit);
    const allproducts = await PRODUCTS.getAll();

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

router.get("/:pid", async (req,res) => {
  try{
    const id = Number(req.params.pid);
    const allproducts = await PRODUCTS.getById(id);

    if(allproducts[0].error) {
      res.status(404).send(allproducts);
    } else {
      res.status(200).send(allproducts);
    }

  }catch(error){
    res.status(500).send([{ error: "Ocurrio un error"}]);
  }
});
router.post("/", async (req,res) => {
  try{
    const body = req.body;
    const saveProduct = await PRODUCTS.save(body)

    if(!body ||!body.title || !body.descripcion || !body.price || !body.code || !body.stock || !body.category || !body.thumbnail){
      res.status(400).send({error: "Debe proporcionar todos los campos (id, name, price, description, code, stock, category, thumbnail)."})
    } else {
      res.status(200).send([{id: saveProduct}]);
    }
  }catch(error){
    res.status(500).send([{error: "Ocurrio un error"}]);  
  }
})

router.delete("/:pid", async (req,res) => {
  try{
    const id = Number(req.params.pid);

    const deleteProduct = await PRODUCTS.deleteById(id);

    if(deleteProduct[0].error) {
      res.status(404).send(deleteProduct);
    } else{
      res.status(200).send(deleteProduct);
    }
  }catch(error){
    res.status(500).send([{error: "Ocurrio un error"}]);  
  }
})

router.put("/:pid", async (req,res) => {
  try{
    const id = Number(req.params.pid);
    const body = req.body;

    if(!body ||!body.title || !body.descripcion || !body.price || !body.code || !body.stock || !body.category || !body.thumbnail){
      res.status(400).send({error: "Debe proporcionar todos los campos (id, name, price, description, code, stock, category, thumbnail)."})
     } 

     const updateProduct = await PRODUCTS.editById(id, body);

     if (updateProduct[0].error) {
      res.status(404).send(updateProduct);
    } else{
      res.status(200).send(updateProduct);
    }
  }catch(error){
    res.status(500).send([{error: "Ocurrio un error"}]);  
  }
})

module.exports = router;