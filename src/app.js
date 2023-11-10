const express = require("express");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errors/index.js");
const MongoStore = require('connect-mongo');
const handlebars = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const { inicializePassport } = require("./middlewares/passport.config");
const {connectionMongodb} = require("./dao/connectionDatabase.js");
const app = express();
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");
const viewsSessionsRouter = require("./routes/viewsSessions.router");
const viewsProductRouter = require("./routes/viewsProducts.router");
const viewsCartsRouter = require("./routes/viewsCarts.router");
const sessionsRouter = require("./routes/sessions.router");
const mockingproducts = require("./routes/mockingProduct.router");
const loggerTest = require('./routes/loggerTest.router.js')
const config = require("./config/config.js");
const logger = require("./util/logger/logger.js");
const URL_MONGODB = config.MONGO_URL
const PORT = config.PORT ?? 8080;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(logger);

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


inicializePassport(passport)
app.use(passport.initialize());
app.use(passport.session())

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
app.use("/api/mockingproducts", mockingproducts);
app.use("/loggertest", loggerTest);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
