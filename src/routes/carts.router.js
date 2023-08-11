const express = require('express');
const router = express.Router();
const Carts = require('../carts.js');
const FILE_CARTS = './src/data/dataCarts.json';
const CARTS = new Carts(FILE_CARTS);

router.post("/", async (req,res) => {
  try{
    const newCarts = await CARTS.save();
    
    res.status(200).send(newCarts);

  }catch(error){
    res.status(500).send([{ error: "Ocurrio un error"}])   }
});

router.get("/:cid", async (req,res) => {
  // deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados
  const id = Number(req.params.cid);
  try{
    const cartId = await CARTS.getById(id);

    if(cartId[0].error) {
      res.status(404).send(cartId);
    }else {
      res.status(200).send(cartId);
    }

  }catch(error){
    res.status(500).send([{ error: "Ocurrio un error"}])   }
})

router.post("/:cid/product/:pid", async (req,res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);
  try{
    const addProduct = await CARTS.addProduct(cartId, productId);
    
    if(addProduct[0].error) {
      res.status(404).send(addProduct);
    }else{
      res.status(200).send(addProduct);
    }
  }catch(error){
    res.status(500).send([{ error: "Ocurrio un error"}])   }


});

module.exports = router