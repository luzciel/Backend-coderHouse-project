const express = require("express");
const router = express.Router();
const { productModel } = require("../models/product.model");
const handleError = require("../util/handleError.js");

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const page = req.query.page ? Number(req.query.page) : 1;
    let query = req.query.query ? req.query.query : {};
    query = typeof query === "object" ? query : JSON.parse(query);
    const sort = req.query.sort;

    const link = `http://localhost:8080/api/products?limit=${limit}&query=${encodeURIComponent(
      JSON.stringify(query)
    )}&sort=${sort}`;

    const options = {
      limit: limit,
      page: page,
    };

    if (sort === "asc" || sort === "desc") {
      const price = sort === "asc" ? 1 : -1;
      options.sort = { price: sort };
    }

    const allproducts = await productModel.paginate(query, options);

    let prevPage = allproducts.prevPage;
    const nextPage = allproducts.nextPage;
    const prePageLink = prevPage === null ? null : `${link}&page=${prevPage}`;
    const nextPageLink = nextPage === null ? null : `${link}&page=${nextPage}`;

    allproducts.prevPage = prePageLink;
    allproducts.nextPage = nextPageLink;

    res.status(200).send({ status: "success", payload: allproducts });
  } catch (error) {
    handleError(res, error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const id = String(req.params.pid);
    const product = await productModel.findById({ _id: id }).exec();
    if (product === null) {
      res.status(404).send([
        {
          status: "error",
          error: "No se encontro el producto con el id:" + id,
        },
      ]);
    } else {
      res.status(200).send({ status: "success", payload: product });
    }
  } catch (error) {
    handleError(res, error);  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (
      !body ||
      !body.title ||
      !body.description ||
      !body.price ||
      !body.code ||
      !body.stock ||
      !body.category
    ) {
      res.status(400).send({
        error:
          "Debe proporcionar todos los campos (title, price, description, code, stock, category).",
      });
    } else {
      const saveProduct = await productModel.create(body);
      res.status(200).send([{ status: "success", payload: saveProduct }]);
    }
  } catch (error) {
    handleError(res, error);  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id = String(req.params.pid);

    if (!isValidObjectId(id)) {
      res.status(400).send({ status: "error", payload: "ID no válido" });
      return;
    } else {
      const deleteProduct = await productModel.deleteOne({ _id: id });

      if (deleteProduct.deletedCount === 0) {
        res.status(404).send([
          {
            status: "error",
            error: "No se encontro el producto con el id:" + id,
          },
        ]);
        return;
      } else {
        res.status(200).send({ status: "success", payload: deleteProduct });
      }
    }
  } catch (error) {
    handleError(res, error);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const id = String(req.params.pid);
    const body = req.body;

    if (
      !body ||
      !body.title ||
      !body.descripcion ||
      !body.price ||
      !body.code ||
      !body.stock ||
      !body.category ||
      !body.thumbnail ||
      !id
    ) {
      res.status(400).send({
        status: "error",
        error:
          "Debe proporcionar todos los campos (id, title, price, description, code, stock, category, thumbnail).",
      });
      return;
    } else if (!isValidObjectId(id)) {
      res.status(400).send({ status: "error", payload: "ID no válido" });
      return;
    }

    const updateProduct = await productModel.updateOne({ _id: id }, body);

    if (updateProduct.matchedCount === 0) {
      res.status(404).send([
        {
          status: "error",
          error: "No se encontro el producto con el id:" + id,
        },
      ]);
    } else {
      res.status(200).send({ status: "success", payload: updateProduct });
    }
  } catch (error) {
    handleError(res, error);
  }
});

function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

module.exports = router;
