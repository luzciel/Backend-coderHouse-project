const express = require('express');
const app = express();
const cartsRouter = require("./routes/products.router");
const productsRouter = require("./routes/carts.router");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8080;

app.use("/", cartsRouter);
app.use("/", productsRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})
