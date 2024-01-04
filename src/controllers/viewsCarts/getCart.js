const config = require("../../config/config.js");
const fetch = require("node-fetch");
const URL = config.URL;
const getCart = async (req, res) => {
  try { 
    const cid = req.params.cid;
    const cookie = req.cookies.cart;
    const id = cid ? cid : cookie;
    const token = req.cookies.coderCookieToken;
    
    let myHeaders = new Headers()
    myHeaders.append("Cookie", `coderCookieToken=${token}`)
  
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
    };
    
    const response = await fetch(`http://localhost:8080/api/carts/${id}`,
    requestOptions);
    const data = await response.json();

    if(data.status !== "success") {
      let isValid = false
      return res.render('cart', { isValid });
    }
    
    const products = data?.payload[0]?.products;
    let isValid = true ;
    res.render('cart', { cart: products, isValid, idCart: id });
  }catch (error) {
    req.logger.error(error);
  }
}
module.exports = getCart ;