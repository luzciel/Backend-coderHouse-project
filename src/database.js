const mongoose = require("mongoose");
const URL_MONGODB = "mongodb+srv://luzcielm:luzcielm@cluster0.4wsbetm.mongodb.net/ecommerce?retryWrites=true&w=majority";

const connectionMongodb = async () => {
  try {
    await mongoose.connect( URL_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log("successful connection");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {connectionMongodb}