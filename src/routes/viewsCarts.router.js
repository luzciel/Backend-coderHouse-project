const {Router} = require('express');
const router = Router();

router.get('/:cid', async (req, res) => {
  console.log("cartid",req.params.cid);
  try { 
    const cid = String(req.params.cid);
    const response = await fetch(`http://localhost:8080/api/carts/${cid}`);
    const data = await response.json();

    if(data.status !== "success") {
      let isValid = false
      return res.render('cart', { isValid });
    }
    const products = data?.payload[0]?.products;
    let isValid = true ;
    res.render('cart', { cart: products, isValid });
  }catch (error) {
    console.error(error);
  }
})


module.exports = router;