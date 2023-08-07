const express = require('express');
const router = express.Router();
const Carts = require('../carts.js');
const FILE_CARTS = './src/data/dataCarts.json';

router.post("/api/carts", async (req,res) => {
  try{
    const carts = new Carts(FILE_CARTS);
    const newCarts = await carts.save();
    
    res.status(200).send(newCarts);

  }catch(error){
    res.status(500).send([{ error: "Ocurrio un error"}])   }
});

router.get("/api/carts/:cid", async (req,res) => {
  // deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados
  const id = Number(req.params.cid);
  try{
    const carts = new Carts(FILE_CARTS);
    const cartId = await carts.getById(id);

    if(cartId[0].error) {
      res.status(404).send(cartId);
    }else {
      res.status(200).send(cartId);
    }

  }catch(error){
    res.status(500).send([{ error: "Ocurrio un error"}])   }
})

router.post("/api/carts/:cid/product/:pid", async (req,res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);
  try{
    const carts = new Carts(FILE_CARTS);
    const addProduct = await carts.addProduct(cartId, productId);
    
    if(addProduct[0].error) {
      res.status(404).send(addProduct);
    }else{
      res.status(200).send(addProduct);
    }
  }catch(error){
    res.status(500).send([{ error: "Ocurrio un error"}])   }


});

module.exports = router