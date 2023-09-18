const express = require("express");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");
const viewsSessionsRouter = require("./routes/viewsSessions.router");
const viewsProductRouter = require("./routes/viewsProducts.router");
const viewsCartsRouter = require("./routes/viewsCarts.router");
const sessionsRouter = require("./routes/sessions.router");
const PORT = 8080;
const URL_MONGODB = "mongodb+srv://luzcielm:luzcielm@cluster0.4wsbetm.mongodb.net/ecommerce?retryWrites=true&w=majority";

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectionMongodb = async () => {
  try {
    await mongoose.connect( URL_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log("successful connection");
  } catch (error) {
    console.error(error);
  }
};
connectionMongodb();

app.use(session({
  store: MongoStore.create({
      mongoUrl: URL_MONGODB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60000,
  }),
  secret: 'coderhouse',
  resave: false,
  saveUninitialized: true,
}));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));
app.use("/products", viewsProductRouter);
app.use("/carts", viewsCartsRouter);
app.use("/", viewsSessionsRouter);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
