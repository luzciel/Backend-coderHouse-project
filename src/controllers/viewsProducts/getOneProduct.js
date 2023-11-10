const getOneProduct = async (req, res) => {
  const id = String(req.params.pid);
  let isValid = true;
  
  try {
  const response = await fetch(`http://localhost:8080/api/products/${id}`);
  const data = await response.json();

  if (data.status !== "success") {
    isValid = false;
    return res.render("products", { isValid });
  }

  res.render("product", { product: data, isValid });
  
} catch (error) {
  req.logger.error(error);
}
}
module.exports = getOneProduct;