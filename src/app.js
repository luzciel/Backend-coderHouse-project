const express = require("express");
// const session = require('express-session');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/viewsProducts.router");
const viewsCartsRouter = require("./routes/viewsCarts.router");
const PORT = 8080;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectionMongodb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://luzcielm:luzcielm@cluster0.4wsbetm.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("successful connection");
  } catch (error) {
    console.log(error);
  }
};
connectionMongodb();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));
app.use("/products", viewsRouter);
app.use("/carts", viewsCartsRouter);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
