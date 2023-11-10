const getProducts = async (req, res) => {
  const cookieUserData = req.cookies?.userData;
    
  if (!cookieUserData) {
    return res.redirect("/");
  }

  const userData = JSON.parse(cookieUserData);
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 2;
  const nextPage = page + 1;
  const prevPage = page - 1;
  let isValid = true;
    
    try {
      const response = await fetch(`http://localhost:8080/api/products?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data.status !== "success") {
        isValid = false;
        return res.render("products", { isValid });
      }

      res.render("products", {
        products: data,
        isValid,
        nextPage,
        prevPage,
        userData
      });
  } catch (error) {
      req.logger.error(error);
  }
}

module.exports = getProducts;