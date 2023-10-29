const config = require("../config/config.js");
const twilio = require("twilio");
const TWILIO_ACCOUNT_SID = config.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = config.TWILIO_AUTH_TOKEN;
const TWILIO_SMS_NUMBER = config.TWILIO_SMS_NUMBER;
const NUMBER_TEST = config.NUMBER_TEST;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const textMessage = async ({textMessageBody}) => {
  let sms = await twilioClient.messages.create({
    body: textMessageBody,
    to: TWILIO_SMS_NUMBER,
    from: TWILIO_SMS_NUMBER,
    to: NUMBER_TEST
  })
}

module.exports = {
  textMessage
}