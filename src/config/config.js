const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  MONGO_URL: process.env.MONGO_URL,
  MONGO_URL_TESTING: process.env.MONGO_URL_TESTING,
  PORT: process.env.PORT,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  USER_EMAIL: process.env.USER_EMAIL,
  PASS_EMAIL: process.env.PASS_EMAIL,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_SMS_NUMBER: process.env.TWILIO_SMS_NUMBER,
  NUMBER_TEST: process.env.NUMBER_TEST,
  NODE_ENV: process.env.NODE_ENV,
  KEY_JWT: process.env.KEY_JWT,
  URL: process.env.URL
}