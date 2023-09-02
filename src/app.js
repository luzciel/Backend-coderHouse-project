const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productsRouter = require("./routes/products.router");
const usersRouter = require("./routes/users.router");


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8080;

const connectionMongodb = async () => {
  try{
    await mongoose.connect('mongodb+srv://luzcielm:luzcielm@cluster0.4wsbetm.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log("successful connection");
  } catch(error){
    console.log(error);
  }
}
connectionMongodb();

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})
