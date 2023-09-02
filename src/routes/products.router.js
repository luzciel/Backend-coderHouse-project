const express = require("express");
const router = express.Router();
const { productModel } = require("../models/product.model");

router.get("/", async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const allproducts = await productModel.find().limit(limit);

    res.status(200).send({ result: "success", payload: allproducts });

  } catch (error) {
    res.status(500).send([{ error: "Ocurrio un error" }]);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const id = String(req.params.pid);
    const allproducts = await productModel.findById({ _id: id }).exec();
    if (allproducts === null) {
      res
        .status(404)
        .send([
          {
            result: "error",
            error: "No se encontro el producto con el id:" + id,
          },
        ]);
    } else {
      res.status(200).send({ result: "success", payload: allproducts });
    }

  } catch (error) {
    res.status(500).send([{ result: "error", error: error }]);
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (
      !body ||
      !body.nombre ||
      !body.categoria ||
      !body.precio ||
      !body.stock ||
      !body.imagen
    ) {
      res
        .status(400)
        .send({
          error:
            "Debe proporcionar todos los campos ((id, nombre,categoria, precio, stock, imagen).",
        });
    } else {
      const saveProduct = await productModel.create(body);
      res.status(200).send([{ result: "success", payload: saveProduct }]);
    }

  } catch (error) {
    res.status(500).send([{ result: "error", error: error }]);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id = String(req.params.pid);
    
    if (!isValidObjectId(id)) {
      res.status(400).send({ result: "error", error: "ID no válido" });
      return
    } else {
      const deleteProduct = await productModel.deleteOne({ _id: id });

      if (deleteProduct.deletedCount === 0) {
        res
          .status(404)
          .send([
            {
              result: "error",
              error: "No se encontro el producto con el id:" + id,
            },
          ]);
          return
      } else {
        res.status(200).send({result: "success", payload: deleteProduct});
      }
    }

  } catch (error) {
    res.status(500).send([{ result: "error", error: error }]);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const id = String(req.params.pid);
    const body = req.body;

    if (
      !body ||
      !body.nombre ||
      !body.categoria ||
      !body.precio ||
      !body.stock ||
      !body.imagen ||
      !id
    ) {
      res
        .status(400)
        .send({ result: "error",
          error:
            "Debe proporcionar todos los campos (id, nombre,categoria, precio, stock, imagen).",
        });
      return;
    } else if (!isValidObjectId(id)) {
      res.status(400).send({ result: "error", error: "ID no válido" });
      return;

    }

    const updateProduct = await productModel.updateOne({ _id: id }, body);

    if (updateProduct.matchedCount === 0) {
      res
        .status(404)
        .send([
          {
            result: "error",
            error: "No se encontro el producto con el id:" + id
          },
        ]);
    } else {
      res.status(200).send({result: "success", payload: updateProduct});
    }

  } catch (error) {
    res.status(500).send([{ result: "error", error: error }]);
  }
});

function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

module.exports = router;
