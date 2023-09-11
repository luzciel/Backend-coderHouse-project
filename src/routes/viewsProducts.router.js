const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 2;
    const nextPage = page + 1;
    const prevPage = page - 1;
    let isValid = true;
    const response = await fetch(
      `http://localhost:8080/api/products?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    if (data.status !== "success") {
      isValid = false;
      return res.render("products", { isValid });
    }
    res.render("products", { products: data, isValid, nextPage, prevPage });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const id = String(req.params.pid);
    let isValid = true;
    const response = await fetch(`http://localhost:8080/api/products/${id}`);
    const data = await response.json();

    if (data.status !== "success") {
      isValid = false;
      return res.render("products", { isValid });
    }
    res.render("product", { product: data, isValid });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
