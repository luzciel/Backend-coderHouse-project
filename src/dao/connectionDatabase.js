const mongoose = require("mongoose");
const config = require("../config/config.js");
const URL_MONGODB = config.MONGO_URL

const connectionMongodb = async () => {
  try {
    await mongoose.connect(URL_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successful connection");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectionMongodb };
